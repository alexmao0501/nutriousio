import { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import calorieContext from "./CalorieContext";

export default function MealInfo(props) {
    const ctx = useContext(calorieContext);
    let body = null;
    if (ctx.meal.length === 0) {
        body = (<p>Your meal is empty</p>)
    }
    else {
        body = (
            <>
                <Row>
                    <Col md={8}>
                        <p>Item Name</p>
                    </Col>
                    <Col md={3}>
                        <p>Quantity</p>
                    </Col>
                </Row>
                {ctx.meal.map(x => (
                    <>
                        <Row>
                            <Col md={9}>
                            <p>{x.name}</p>
                            </Col>
                            <Col md={2}>
                            <p>{x.quantity}</p>
                            </Col>
                            <Col md={1}>
                                <FaTrashAlt onClick={() => ctx.deleteItem(x)}/>
                            </Col>
                        </Row>
                    </>
                ))}
            </>
        )
    }
    return (
        <Card style={{width: '27rem', height: 350}}>
            <Card.Title>New Meal</Card.Title>
            <Card.Body>
                {body}
            </Card.Body>
            <Card.Footer>
                <p>Total Calories: {ctx.totalCalories}</p>
                <Button className='selectButton'>Save Meal</Button>
            </Card.Footer>
        </Card>
    )
}