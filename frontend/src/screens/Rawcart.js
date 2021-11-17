import React, { useEffect, useState } from "react";
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
import {
  addToCart,
  getCartDetails,
  removeFromCart,
} from "../actions/cartActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import actionsCreator from "../actions/combinedActions";
import { get } from "mongoose";

const Rawcart = ({ history }) => {
  const dispatch = useDispatch();

  const cartDetails = useSelector((state) => state.cart);

  let [cartItems, setCartItems] = useState([]);
  let loading = cartDetails.loading;
  let error = cartDetails.error;
  cartItems = cartDetails.cartItems;

  console.log(cartDetails);

  console.log(`Cart : ${cartDetails}`);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("user info");
  console.log(userInfo);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      let args = {
        method: "get",
        apiType: "cart",
        params: { email: userInfo.email },
      };
      dispatch(actionsCreator(args)());
      //dispatch(getCartDetails());
      history.push("/rawcart");
    }
  }, [dispatch]);

  const removeFromCartHandler = (id) => {
    console.log("deletete");
    console.log(id);
    console.log(cartItems);
    let cartLength = cartItems.length;
    let index = -1;
    console.log(cartLength);
    for (let i = 0; i < cartLength; i++) {
      if (cartItems[i]._id == id) {
        index = i;
      }
    }
    console.log("index is ");
    console.log(index);
    cartItems.splice(index, 1);

    console.log("set state first call");
    setCartItems(cartItems);
    console.log("set state second call");
    setCartItems((cartItems) => {
      console.log("inside set state");
      console.log(cartItems);
      return cartItems;
    });

    let args = {
      method: "delete",
      apiType: "cart",
      params: { email: userInfo.email },
      additionalUrl: `${id}`,
    };
    dispatch(actionsCreator(args)());
    // dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h2 style={{ textAlign: "left", marginBottom: "30px" }}>
          Dealer's Cart
        </h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {cartItems ? (
              <>
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
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={3}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={2}>&#8377;{item.price}</Col>
                          <Col md={2}>
                            <Form.Control
                              as="select"
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
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
                          <Col md={2}>
                            <Button
                              type="button"
                              variant="primary"
                              onClick={() => removeFromCartHandler(item._id)}
                            >
                              {/* <i className="fas fa-trash"></i> */}
                              DELETE
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </>
            ) : (
              <>Cart is Empty</>
            )}
          </>
        )}
      </Col>
      <Col md={4}>
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

export default Rawcart;
