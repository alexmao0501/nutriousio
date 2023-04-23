import { useState, useContext, useEffect } from "react";
import { Card, ListGroup, Form, Button, Row, Col } from "react-bootstrap";
import calorieContext from "./CalorieContext";

export default function FoodList(props) {
    const ctx = useContext(calorieContext);
    const [itemName, setItemName] = useState('');
    const [displayFood, setDisplayFood] = useState(ctx.foodList);

    const onFoodClick = (x) => {
        ctx.setSelectedItem(x);
    }

    const handleSearch = (val) => {
        if (val) {
            setDisplayFood(ctx.foodList.filter(y => y.name.toLowerCase().includes(val.toLowerCase())));
            setItemName(val);
        }
        else if (val.length === 0 && ctx.isSearched === true) {
            ctx.setIsSearched(false);
            setDisplayFood(ctx.foodList);
            setItemName(val);
        }
        else {
            setDisplayFood(ctx.foodList);
        }
    }

    return(
        <Card style={{width: '27rem', height: 350}}>
            <Card.Title>Calorie Calculator</Card.Title>
            <Row>
                <Col lg="9">
                    <Form.Control type="text" onChange={e => handleSearch(e.target.value)}/>
                </Col>
                <Col lg="3">
                    <Button className="selectButton" onClick={() => ctx.search(itemName)}>Search</Button>
                </Col>
            </Row>
            <div style={{height: 300, overflowY: 'auto'}}>
                <ListGroup>
                    {!ctx.isSearched ? displayFood.map(x => (
                        <ListGroup.Item onClick={() => onFoodClick(x)}>{x.name}</ListGroup.Item>
                    )) :
                    ctx.searchedFood.map(x => (
                        <ListGroup.Item onClick={() => onFoodClick(x)}>{x.name}</ListGroup.Item>
                    ))
                    }
                </ListGroup>
            </div>
        </Card>
    );
}