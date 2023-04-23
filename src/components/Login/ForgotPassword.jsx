import { Form, Card, Button } from 'react-bootstrap';
import './styles.scss';

const onForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value.toLowerCase();
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;
    if (password !== confirmPassword) {
        /*
        * Display some error
        */
    }
    /**
     * Call signup api from backend with email and password and calorie limit
     */
}

export default function ForgotPassword() {
    return(
        <Card style={{width: '27rem', margin: 'auto', display: 'flex'}}>
            <Card.Body>
                <Card.Title>Forgot Password</Card.Title>
                <Form onSubmit={onForgotPasswordSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button type="submit" className="selectButton">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}