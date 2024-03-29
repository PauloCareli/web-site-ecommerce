import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { RootState } from "../redux/store"; // Assuming you have a file named "store" with the root state type.
import { CartState, addToCart, removeFromCart } from "../actions/cartActions"; // Assuming you have an interface for the Cart state.

function CartScreen() {
    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();
    const cart = useSelector<RootState, CartState>((state) => state.cart); // Update the type for useSelector
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/shipping");
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant="info">
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                        <Form.Select
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items $
                                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </h2>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed to checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
