import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';

const authContext = React.createContext({
    user: {},
    loggedIn: {},
    food: {},
    recommendedRecipes: {},
    signInHandler: ()=>{},
    setUser: ()=>{},
    setFood: ()=>{},
})

export function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [food, setFood] = useState([]);
    const [userCookie, setUserCookie] = useCookies(['user']);
    const [recipeCookie, setRecipeCookie] = useCookies(['recommendedRecipes'])
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);

    const signInHandler = (user) => {
        if (!recipeCookie['recommendedRecipes']){
            fetch('http://localhost:5000/recommendedRecipes', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    calorie_limit: user.calorieLimit
                })
            }).then(response => response.json())
            .then(data => {
                console.log("in singinhandler", data);
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate()+1);
                setRecipeCookie('recommendedRecipes', data, {expires: expirationDate});
                setRecommendedRecipes(data)
            });
        }
        else {
            setRecommendedRecipes(recipeCookie['recommendedRecipes']);
        }
        const date = new Date();
        date.setMinutes(date.getMinutes()+10);
        setUserCookie('user', user,  {expires: date});
        setUser(user);
        setLoggedIn(true);
    }

    useEffect(() => {
        fetch("http://localhost:5000/mealcreator", {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => response.json())
        .then(data => setFood(data.all_food));
    }, []);

    const passedValues = {
        user,
        loggedIn,
        food,
        recommendedRecipes,
        signInHandler,
        setUser,
        setFood
    }

    return (
        <authContext.Provider value={passedValues}>
            {props.children}
        </authContext.Provider>
    )

}

export default authContext;