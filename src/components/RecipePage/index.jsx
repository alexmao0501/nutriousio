import React from "react";
import { useState, useContext, createContext, useEffect } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../Navbar";
import authContext from "../AuthContext/AuthContext";

const RecipeContext = createContext({});

export default function RecipePage() {
  const [recipe, setRecipe] = useState({});

  return (
    <RecipeContext.Provider value={{ recipe, setRecipe }}>
      <div className="recipe-page-container">
        <Navbar />
        <div className="header-row">
          <Link to="/" className="back-btn">
            <span>Back</span>
          </Link>
          <h1>Recipe Recommendations</h1>
        </div>
        <div className="functional-section">
          <div className="daily-recommendations">
            <div className="recommendations-container">
              <h2>Daily Recommendations</h2>
              <DailyRecommendations />
            </div>
          </div>
          <div className="meal-section">
            <MealDetails />
            <MealList />
          </div>
        </div>
      </div>
    </RecipeContext.Provider>
  );
}

function DailyRecommendations() {
  const [recipeList, setRecipeList] = useState([]);
  const { setRecipe } = useContext(RecipeContext);
  const [cookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const { recommendedRecipes, user, signInHandler } = useContext(authContext);

  useEffect(() => {
    if (cookie["user"]) {
      signInHandler(cookie["user"]);
      fetch("http://localhost:5000/allRecipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("in meallist", data);
          setRecipeList(data);
          console.log("user recommendations", recommendedRecipes);
          console.log("user: ", cookie["user"]);
        });
    } else {
      navigate("../");
    }
  }, []);

  const dailyRecommendations = recommendedRecipes.map((r) => (
    <button
      className="recipe-container"
      key={r.id}
      onClick={() => handleRecipeClick(r.id)}
    >
      <span>{r.name}</span>
      <img src={r.imgSrc} alt="Recipe Image" />
    </button>
  ));

  // function generateRecommendations() {
  //   return recommendedRecipes.map((r) => (
  //     <button
  //       className="recipe-container"
  //       key={r.id}
  //       onClick={() => handleRecipeClick(r.id)}
  //     >
  //       <span>{r.name}</span>
  //       <img src={r.imgSrc} alt="Recipe Image" />
  //     </button>
  //   ));
  // }

  function handleRecipeClick(id) {
    console.log("Clicked, Recommended ID: ", id);
    const recipe = recipeList.find((item) => item.id === id);
    if (recipe) {
      console.log("Found Recipe");
      setRecipe(recipe);
    }
  }

  return (
    <div className="recommended-meals-container">{dailyRecommendations}</div>
  );
}

function MealDetails() {
  const { recipe } = useContext(RecipeContext);
  const [cookie] = useCookies(["user"]);

  function saveMeal(meal) {
    if (cookie["user"]) {
      console.log("added recipe to mealhistory");
      fetch("http://localhost:5000/savemeal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cookie["user"].email,
          date: new Date(),
          meal: meal,
          mealType: "recipe",
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }

  function displayRecipeDetails() {
    if (Object.keys(recipe).length === 0) {
      return <h2>Click on a recipe to see its details!</h2>;
    } else {
      return (
        <>
          <h2>{recipe.name}</h2>
          <img src={recipe.imgSrc} alt="Detail Image" />
          <button className="add-btn" onClick={() => saveMeal(recipe)}>
            Add To Meal History
          </button>
          <h3 className="subheader">Ingredients:</h3>
          <ul>{getLIs(recipe.ingredients)}</ul>
          <h3 className="subheader">Macronutrients:</h3>
          <ul>
            <li>Calories: {recipe.macros.calories}</li>
            <li>Protein: {recipe.macros.protein}g</li>
            <li>Carbs: {recipe.macros.carbs}g</li>
            <li>Fat: {recipe.macros.fat}g</li>
          </ul>
          <h3 className="subheader">Instructions:</h3>
          <ol className="instructions">{getLIs(recipe.instructions)}</ol>
        </>
      );
    }
  }

  function getLIs(obj) {
    const output = [];
    for (const i in obj) {
      output.push(<li key={i}>{obj[i]}</li>);
    }
    return output;
  }

  return <div className="meal-details">{displayRecipeDetails()}</div>;
}

function MealList() {
  const [recipeList, setRecipeList] = useState([]);
  const [originalRecipeList, setOriginalRecipeList] = useState([]);
  const { setRecipe } = useContext(RecipeContext);

  useEffect(() => {
    fetch("http://localhost:5000/allRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("in meallist", data);
        setOriginalRecipeList(data);
        setRecipeList(data);
      });
  }, []);

  function handleRecipeClick(id) {
    const recipe = recipeList.find((item) => item.id === id);
    if (recipe) setRecipe(recipe);
  }

  //Generate list of recipes
  const recipes = recipeList.map((item) => (
    <button
      className="recipe-container"
      key={item.id}
      onClick={() => handleRecipeClick(item.id)}
    >
      <span>{item.name}</span>
      <img src={item.imgSrc} />
    </button>
  ));

  function handleSearch(val) {
    if (val) {
      setRecipeList(
        originalRecipeList.filter((recipe) =>
          recipe.name.toLowerCase().includes(val.toLowerCase())
        )
      ); //Simple filtering method on change of search bar.
    } else {
      setRecipeList(originalRecipeList); //Resets filter to default array.
    }
  }

  return (
    <div className="search-section">
      <input
        type="text"
        className="search-box"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <div className="recipe-list">{recipes}</div>
    </div>
  );
}
