import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers"; // Assuming you have a RootState type defined for Redux state.
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { CartState } from "../reducers/cartReducers"; // Assuming you have a CartState type defined for cart slice.
import { saveShippingAddress } from "../actions/cartActions";

interface ShippingScreenProps {
    history: any; // Replace 'any' with the appropriate type for the history object if available.
}

const ShippingScreen: React.FC<ShippingScreenProps> = ({ history }) => {
    const navigate = useNavigate();
    const cart = useSelector<RootState, CartState>((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState<string>(shippingAddress.address || "");
    const [city, setCity] = useState<string>(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState<string>(shippingAddress.postalCode || "");
    const [country, setCountry] = useState<string>(shippingAddress.country || "");

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>
                <p></p>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
