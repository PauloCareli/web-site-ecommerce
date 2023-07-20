import React, { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers"; // Assuming you have a RootState type defined for Redux state.
import { UserRegisterState } from "../reducers/userReducers"; // Assuming you have a UserRegisterState type defined for userRegister slice.
import { register } from "../actions/userActions.js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

interface RegisterScreenProps {
    history: any; // Replace 'any' with the appropriate type for the history object if available.
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ history }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userRegister = useSelector<RootState, UserRegisterState>((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <p></p>
                    <Button type="submit" variant="primary">
                        Register
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Have an Account?
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign In</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    );
};

export default RegisterScreen;
