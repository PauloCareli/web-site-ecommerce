import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { RootState, AppDispatch, Product } from "../store"; // Import RootState and AppDispatch types
import { listTopProducts } from "../actions/productActions";
// import { Product } from "../types"; // Import the type representing your product data (e.g., Product)

function ProductCarousel() {
    const dispatch: AppDispatch = useDispatch(); // Use the AppDispatch type for the dispatch function

    const productTopRated = useSelector((state: RootState) => state.productTopRated);
    const { error, loading, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark">
            {products.map((product: Product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className="carousel.caption">
                            <h4>
                                {product.name} (${product.price})
                            </h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ProductCarousel;
