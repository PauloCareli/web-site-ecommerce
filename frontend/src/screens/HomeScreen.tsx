import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";
import { RootState } from "../store"; // Assuming you have a RootState type defined for Redux state.

export function HomeScreen(): JSX.Element {
    // Specify the return type as JSX.Element
    const dispatch = useDispatch();
    const productList = useSelector((state: RootState) => state.productList); // Use RootState to infer the type of state
    const { error, loading, products, page, pages } = productList;
    const location = useLocation();

    let keyword = location.search;

    useEffect(() => {
        console.log(JSON.stringify(products));
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <div>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
            <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
    );
}

export default HomeScreen;
