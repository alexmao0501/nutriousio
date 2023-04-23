import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import authContext from '../AuthContext/AuthContext';
import Navbar from '../Navbar';

export default function Profile() {
    const navigate = useNavigate();
    const ctx = useContext(authContext);
    const [cookie] = useCookies(['user']);
    const [firstName, setFirstName] = useState(ctx ? ctx.user.firstName : null);
    const [lastName, setLastName] = useState(ctx ? ctx.user.lastName : null);
    const [calorieLimit, setCalorieLimit] = useState(ctx ? ctx.user.calorieLimit : null);
    const [weight, setWeight] = useState(ctx ? ctx.user.weight : null);

    useEffect(()  => {
        if (cookie['user']) {
            ctx.signInHandler(cookie['user']);
        }
        else {
            navigate('../')
        }
    }, []);
    
    const onUserEditSubmit = (e) => {
        e.preventDefault();
        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const calorieLimit = e.target[2].value;
        const weight = e.target[3].value;
        const email = ctx.user.email;

        fetch('http://localhost:5000/update_user', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                first_name: firstName,
                last_name: lastName,
                calorie_limit: calorieLimit,
                weight
            })
        }).then(response => {
            ctx.setUser({
                email,
                firstName,
                lastName,
                calorieLimit,
                weight
            });
        });
    }

    return (
        <>
            <Navbar />
            <div className='background'>
                <Card style={{width: '27rem', margin: 'auto'}}>
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Form onSubmit={onUserEditSubmit}>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text"  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCalorieLimit">
                                <Form.Label>Calorie Limit</Form.Label>
                                <Form.Control type="number"  value={calorieLimit} onChange={(e) => setCalorieLimit(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="weight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="number"  value={weight} onChange={(e) => setWeight(e.target.value)}/>
                            </Form.Group>
                            <Button className="selectButton" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}