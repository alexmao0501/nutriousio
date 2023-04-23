import { useNavigate } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import authContext from '../AuthContext/AuthContext';
import { useContext } from 'react';

export default function Login(props) {
    const navigate = useNavigate();
    const ctx = useContext(authContext);

    const onLoginSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value.toLowerCase();
        const password = e.target[1].value;

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => response.json())
        .then(data => {
            ctx.signInHandler({
                email,
                firstName: data.firstName,
                lastName: data.lastName,
                weight: data.weight,
                calorieLimit: data.calorieLimit
            })
            console.log(data.recipes);
            navigate('../');
        });
        // fetch('http://localhost:5000/recommendedRecipes', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     },
        //     body: JSON.stringify({
        //         calorieLi
        //     })
        // }).then(response => response.json())
        // .then(data => console.log(data));
    }

    return (
        <Card style={{width: '27rem', margin: 'auto'}}>
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form onSubmit={onLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Card.Link onClick={props.onForgotPasswordClick}>Forgot Password?</Card.Link>
                        <Card.Link onClick={props.onSignUpClick}>New to Nutrious.io? Click to Sign Up</Card.Link>
                    </Form.Group>
                    <Button className="selectButton" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}