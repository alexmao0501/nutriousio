import { useContext } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authContext from '../AuthContext/AuthContext';

export default function SignUp() {
    const navigate = useNavigate();
    const ctx = useContext(authContext);

    const onSignUpSubmit = (e) => {
        e.preventDefault();
        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const email = e.target[2].value.toLowerCase();
        const password = e.target[3].value;
        const weight = e.target[4].value;
        const calorieLimit = e.target[5].value;
        /**
         * Call signup api from backend with email and password and calorie limit
         */
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                weight,
                calorie_limit: calorieLimit
            })
        }).then(response => {
            ctx.signInHandler({
                email,
                firstName,
                lastName,
                weight,
                calorieLimit
            });
            navigate('../');
        });
    }

    return(
        <>
            <Card style={{width: '27rem', margin: 'auto', display: 'flex'}}>
                <Card.Body>
                    <Card.Title>Sign Up</Card.Title>
                    <Form onSubmit={onSignUpSubmit}>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"  placeholder='Enter First Name'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text"  placeholder='Enter Last Name'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicWeight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type="number" placeholder="Enter your weight in pounds" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCalories">
                            <Form.Label>Number Of Calories</Form.Label>
                            <Form.Control type="number" placeholder="Enter your calorie limit" />
                        </Form.Group>
                        <Button className="selectButton" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}