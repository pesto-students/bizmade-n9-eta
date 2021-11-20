import React, { useEffect } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row className="m-4">
      <Col md={8}>
        <h2 className="fw-bold" style={{ textAlign: "left", marginBottom: "30px" }}>
          Dealer's Cart
        </h2>
        {cartItems.length === 0 ? (
          <>
            <h3>Your cart is empty </h3>
            <Link to="/">
              <Button>Go Back</Button>
            </Link>
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="m-2">
                  <Col md={2} className="m-2">
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className="m-2">
                    <Link className="blue" to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className="m-2">
                    &#8377;
                    {(
                      qty * item.price +
                      0.18 * qty * item.price +
                      150 * qty -
                      (qty > item.minQuantity ? qty * 300 : 0)
                    ).toFixed(0)}
                  </Col>
                  <Col md={2} className="m-2">
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[
                        ...Array(
                          item.maxQuantity - item.minQuantity + 1
                        ).keys(),
                      ].map((x) => (
                        <option
                          key={x + item.minQuantity}
                          value={x + item.minQuantity}
                        >
                          {x + item.minQuantity}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1} className="m-2">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      DELETE
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={3} className="m-2">
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              &#8377;
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            {/* <Link to="/payment"> */}
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
            {/* </Link> */}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
