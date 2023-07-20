import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listProductDetails, createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { RootState } from "../reducers"; // Assuming you have a RootState type defined for Redux state.
import { ProductType, ReviewType } from "../types"; // Assuming you have types for your product and review data.

interface ProductScreenProps {}

const ProductScreen: React.FC<ProductScreenProps> = () => {
    const [qty, setQty] = useState<number>(1);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    const dispatch = useDispatch();
    const productDetails = useSelector((state: RootState) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector((state: RootState) => state.productReviewCreate);
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate;

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        dispatch(listProductDetails(id));
    }, [dispatch, id, successProductReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            createProductReview(id, {
                rating,
                comment,
            })
        );
    };

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                        color={"#f8e825"}
                                    />
                                </ListGroup.Item>

                                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Select
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                                            setQty(parseInt(e.target.value))
                                                        }
                                                    >
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn-block"
                                            disabled={product.countInStock <= 0}
                                            type="button"
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h4>Reviews</h4>
                            {product.reviews.length === 0 && <Message variant="info">No Reviews</Message>}

                            <ListGroup variant="flush">
                                {product.reviews.map((review: ReviewType) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color="#f8e825" />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    <h4>Write a review</h4>

                                    {loadingProductReview && <Loader />}
                                    {successProductReview && <Message variant="success">Review Submitted</Message>}
                                    {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Select
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                                        setRating(parseInt(e.target.value))
                                                    }
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group controlId="comment">
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row={5}
                                                    value={comment}
                                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                                        setComment(e.target.value)
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <p> </p>
                                            <Button disabled={loadingProductReview} type="submit" variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="info">
                                            Please <Link to="/login">login</Link> to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
