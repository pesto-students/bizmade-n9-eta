import React from "react";
import cartItems from "../cartItems";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import { removeFromWishlist } from "../actions/wishlistActions";

const Wishlist = ({ history }) => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const addToCartHandler = (id, qty) => {
    history.push(`/cart/${id}?qty=${qty}`);
    dispatch(removeFromWishlist(id));
  };

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <Row>
      <Col md={12}>
        <h2 style={{ textAlign: "left", marginBottom: "30px" }}>Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <>
            <h3>Your Wishlist is empty </h3>
            <Link to="/">
              <Button>Go Back</Button>
            </Link>
          </>
        ) : (
          <ListGroup variant="flush">
            {wishlistItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>&#8377;{item.price}</Col>
                  <Col md={1}>
                    <Form.Control as="select" value={item.qty}>
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
                      onClick={() => addToCartHandler(item.product, item.qty)}
                    >
                      {/* <i className="fas fa-trash"></i> */}
                      ADD TO CART
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => removeFromWishlistHandler(item.product)}
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
      </Col>
    </Row>
  );
};

export default Wishlist;
