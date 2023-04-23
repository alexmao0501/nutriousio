import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import authContext from "../AuthContext/AuthContext";
import Navbar from "../Navbar";
import FoodInfo from "./FoodInfo";
import MealInfo from "./MealInfo";
import FoodList from "./FoodList";
import './styles.scss'
import { CalorieContextProvider } from "./CalorieContext";

export default function CalorieCalculator() {
    const ctx = useContext(authContext);
    const navigate = useNavigate();

    return (
        <CalorieContextProvider>
            <Navbar />
            <div className="background" style={{paddingLeft: '7%', display: 'inline-block'}}>
                <Row>
                    <MealInfo />
                    <FoodList />
                    <FoodInfo />
                </Row>
            </div>
        </CalorieContextProvider>
    );    
}