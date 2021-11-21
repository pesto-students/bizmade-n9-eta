import React, { useEffect } from "react";
import "../styles.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import products from "../products";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteProduct } from "../actions/productActions";

const ManufacLandingPage = ({ products, manufacturer, history }) => {
  const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);
  // const { loading, error, product } = productList;
  const productDelete = useSelector((state) => state.productDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (successDelete) {
      window.location.reload();
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <div>
      <Container>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        <Row>
          <Col md={12} className="p-4">
            <h2 className="float-start fw-bold">{`Welcome ${manufacturer}`}</h2>
            <Link to="/addproduct">
              <Button className="float-end">ADD PRODUCT</Button>
            </Link>
          </Col>
          {products.length === 0 ? (
            <h4>No products in your Inventory. Start adding products!</h4>
          ) : (
            <>
              {products.map((product) =>
                product.manufacturer === manufacturer ? (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Card className="my-3 p-3 rounded">
                      <Card.Img src={product.image} variant="top" />

                      <Card.Body className="text-left">
                        <Card.Title as="div">
                          <h4><strong>{product.name}</strong></h4>
                        </Card.Title>

                        <Card.Text
                          style={{
                            color: "#0fafe9",
                            fontSize: "medium",
                            fontWeight: "500",
                          }}
                          as="h3"
                        >
                          &#8377;{product.price}
                        </Card.Text>
                        <Link to={`/editproduct/${product._id}`}>
                          <Button className="bg-blue">EDIT</Button>
                        </Link>
                        <Button
                          className="bg-blue"
                          onClick={() => deleteHandler(product._id)}
                        >
                          DELETE
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : (
                  <></>
                )
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ManufacLandingPage;
