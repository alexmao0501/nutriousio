import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import calorieContext from "./CalorieContext";

export default function FoodInfo(props) {
    const ctx = useContext(calorieContext);
    if (ctx.selectedItem) {
        return (
            <Card style={{width: '27rem', height: 350}}>
                <Card.Title>{ctx.selectedItem.name}</Card.Title>
                <Card.Body>
                    <p>Calories: {ctx.selectedItem.calories}</p>
                    <p>Carbohydrates: {ctx.selectedItem.carbs}g</p>
                    <p>Protein: {ctx.selectedItem.protein}g</p>
                    <p>Fat: {ctx.selectedItem.fat}g</p>
                </Card.Body>
                <Card.Footer>
                    <Button className='selectButton' onClick={() => ctx.addToMeal()}>Add to Meal</Button>
                </Card.Footer>
            </Card>
        )
    }
    else return null;
}