import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Container,
  ListGroup,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import "../styles.css";
import tooltip from "./images/tooltip.png";
import "../styles.css";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import { addToWishlist } from "../actions/wishlistActions";
// import { addToCart } from "../actions/cartActions";
import { listProductDetails, listAllProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import { baseURL } from "../constants/appConstants";

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productAllList = useSelector((state) => state.productAllList);
  const { productslist } = productAllList;
  console.log(productslist);

  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const wishlistCreate = useSelector((state) => state.wishlistCreate);
  // const addCart = useSelector((state) => state.addCart);
  // const { loading: addCartLoading, success } = addCart;
  // const { wishlistItem } = wishlistCreate;

  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    } else {
      setQty(product.minQuantity);
      setTotalPrice((product.price + 0.18 * product.price).toFixed(0));
    }
    const fetchedProducts = async () => {
      const { data } = await axios.get(`${baseURL}/api/products/all`);
      setProducts(data);
    };
    fetchedProducts();
    dispatch(listAllProducts());
    // setQty(product.minQuantity);
    // setTotalPrice(product.price * product.minQuantity);
  }, [dispatch, match, product]);

  const category = [];
  products.map((p) => {
    if (p.category === product.category) {
      category.push(p);
    }
  });

  const addToCartHandler = ({ hisory }) => {
    if (!userInfo) {
      history.push("/login");
    } else {
      history.push(`/cart/${match.params.id}?qty=${qty}`);
    }
  };

  const addToWishlistHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(addToWishlist(match.params.id, qty));
      history.push(`/wishlist`);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip {...props}>Add more quantity to apply discount</Tooltip>
  );

  return (
    <Container className="pt-5 container">
      <Row>
        <Col md={6} className="py-md-50">
          <h3 className="blue align-left">
            <strong>{product.name}</strong>
          </h3>
          <ListGroup>
            <ListGroup.Item>
              <Image src={product.image} width="auto" height="350"></Image>
              {/* <Image
                src={Heart}
                className="heart"
                width="30"
                height="30"
                fluid
                onClick={addToWishlistHandler}
              ></Image> */}
              <i
                class="fas fa-heart heart fa-2x"
                onClick={addToWishlistHandler}
              ></i>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={6} className="p-5 float-right align-center">
          <table className="table table-borderless">
            <thead className="bg-blue white">
              <tr>
                <th scope="col">Price</th>
                <th scope="col">
                  {qty === product.minQuantity
                    ? product.price
                    : qty * product.price}
                </th>
              </tr>
            </thead>
            <tbody className="bg-lightblue">
              <tr className="align-center">
                <th scope="row" className="grey">
                  GST
                </th>
                <td>{(0.18 * qty * product.price).toFixed(0)}</td>
              </tr>
              <tr>
                <th scope="row" className="grey">
                  Delivery fee
                </th>
                <td>{150 * qty}</td>
              </tr>
              <tr>
                <th scope="row" className="grey">
                  Discount{" "}
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                    <Image src={tooltip} width="20px" height="20px"></Image>
                  </OverlayTrigger>
                </th>
                <td colSpan="2">
                  {qty > product.minQuantity ? product.price * 0.1 : 0}
                </td>
              </tr>
              <tr>
                <th scope="row" className="grey">
                  Total Price
                </th>
                <td colSpan="2" className="font-weight-bold">
                  {(
                    qty * product.price +
                    0.18 * qty * product.price +
                    150 * qty -
                    (qty > product.minQuantity ? qty * 300 : 0)
                  ).toFixed(0)}
                </td>
              </tr>
              <tr className="table-border">
                <td colSpan="4">
                  <span className="grey font-weight-bold">Quantity :</span>
                  <button
                    className="m-2"
                    onClick={() => {
                      setQty(qty - 1);
                    }}
                    disabled={qty === product.minQuantity}
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    className="m-2"
                    onClick={() => {
                      setQty(qty + 1);
                    }}
                    disabled={qty === product.maxQuantity}
                  >
                    +
                  </button>
                </td>
              </tr>

              <tr>
                <td colSpan="4">
                  <button className="w-75 m-2" onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                  {/* <Link to="/shipping">
                    <button className="m-2">Buy Now</button>
                  </Link> */}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col md={6} className="align-left">
          <table class="table table-responsive table-borderless pt-4">
            <tbody>
              <tr>
                <th scope="row">Description</th>
                <td>{product.description}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <p className="pt-5">
        <strong>Related Products</strong>
      </p>
      <Row className="p-1">
        <Col md={12}>
          {category.map(
            (product, index) =>
              index < 4 && (
                <Card
                  style={{ width: "15rem" }}
                  className="float-right pt-4 m-2 shadow"
                  onClick={() => window.scrollTo(0, 0, "smooth")}
                >
                  <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
                  </Link>
                  <Card.Body>
                    <Link to={`/product/${product._id}`}>
                      <Card.Title
                        className="card-title"
                        style={{
                          color: "#0fafe9",
                          fontSize: "medium",
                          fontWeight: "500",
                        }}
                      >
                        <h4>
                          <strong>{product.name}</strong>
                        </h4>
                      </Card.Title>
                    </Link>
                    <Card.Text
                      style={{
                        color: "#0fafe9",
                        fontSize: "medium",
                        fontWeight: "500",
                      }}
                      as="h4"
                    >
                      <p>{product.manufacturer}</p>
                    </Card.Text>
                    <Card.Text
                      style={{
                        color: "#3B3B3B",
                        fontSize: "medium",
                        fontWeight: "500",
                      }}
                      as="h3"
                    >
                      <strong>&#8377;{product.price}</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              )
          )}
          ;
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;
