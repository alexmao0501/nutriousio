import React, { useContext, useEffect, useState } from 'react';
import authContext from '../AuthContext/AuthContext';

const calorieContext = React.createContext({
    foodList: [],
    searchedFood: [],
    isSearched: false,
    selectedItem: {},
    meal: [],
    totalCalories: 0,
    addToMeal: ()=>{},
    setIsSearched: ()=>{},
    setSearchedFood: ()=>{},
    setMeal: ()=>{},
    setTotalCalories: ()=>{},
    setSelectedItem: ()=>{},
    deleteItem: ()=>{},
    search: ()=>{}
})

export function CalorieContextProvider(props) {
    const [meal, setMeal] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSearched, setIsSearched] = useState(false);
    const [searchedFood, setSearchedFood] = useState([]);
    const ctx = useContext(authContext);

    const addToMeal = () => {
        let mealCopy = [...meal];
        for (let i=0; i<mealCopy.length; i++) {
            if (mealCopy[i].name === selectedItem.name) {
                mealCopy[i].quantity += 1;
                setMeal(mealCopy);
                setTotalCalories(totalCalories + parseInt(selectedItem.calories));
                return;
            }
        }
        mealCopy.push({
            name: selectedItem.name,
            calories: selectedItem.calories,
            quantity: 1
        });
        setMeal(mealCopy);
        setIsSearched(false);
        setTotalCalories(totalCalories + parseInt(selectedItem.calories));
    }

    const deleteItem = (item) => {
        let mealCopy = [...meal];
        let index = -1;
        for (let i=0; i<mealCopy.length; i++) {
            if (mealCopy[i].name === item.name){
                index = i;
                break;
            }
        }
        mealCopy.splice(index);
        setMeal(mealCopy);
        setTotalCalories(totalCalories - item.calories * item.quantity);
    }

    const search = (itemName) => {
        fetch('http://localhost:5000/usda_search', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                query: itemName
            })
        }).then(response => response.json())
        .then(data => {
            setIsSearched(true);
            setSearchedFood(data);
            let newFoodData = [...ctx.food];
            newFoodData.push([...searchedFood]);
            ctx.setFood(newFoodData);
        });
    }

    const passedValues = {
        foodList: ctx.food,
        searchedFood,
        isSearched,
        selectedItem,
        meal,
        totalCalories,
        addToMeal,
        setIsSearched,
        setSearchedFood,
        setMeal,
        setTotalCalories,
        setSelectedItem,
        deleteItem,
        search
    }

    return (
        <calorieContext.Provider value={passedValues}>
            {props.children}
        </calorieContext.Provider>
    )

}

export default calorieContext;