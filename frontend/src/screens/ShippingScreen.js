import Button from "@restart/ui/esm/Button";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Form } from "react-bootstrap";
// import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from "../actions/cartActions";
import PaymentScreen from "./PaymentScreen";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [firstName, setFirstName] = useState("Test");
  const [lastName, setLastname] = useState("Name");
  const [email, setEmail] = useState("test@gmail.com");
  const [country, setCountry] = useState(shippingAddress.country);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [phone, setPhone] = useState(shippingAddress.phone);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        address,
        city,
        email,
        postalCode,
        country,
        phone,
        email,
      })
    );

    console.log(
      JSON.stringify({
        firstName,
        lastName,
        address,
        city,
        email,
        postalCode,
        country,
        phone,
        email,
      })
    );

    history.push("/payment");
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6}>
            <p className="fw-bold">Billing Address</p>
            <form>
              <input
                className="state col-md-12 m-1"
                placeholder="Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></input>
              <input
                className="streetaddress col-md-12 m-1"
                placeholder="Street Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <input
                className="town col-md-12 m-1"
                placeholder="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></input>
              <input
                className="postalcode col-md-12 m-1"
                placeholder="Postal Code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
              <input
                className="phone col-md-12 m-1"
                placeholder="Phone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </form>
            <Button type="submit" variant="primary" onClick={submitHandler}>
              Continue
            </Button>
          </Col>
          <Col md={6}>
            <Row>
              <p className="fw-bold">Your Orders</p>
              <Table className="table-bordered">
                <tbody>
                  <tr className="no-border p-5">
                    <td>
                      <Image src="" />
                      Cooking Oil
                    </td>
                    <td>Qty:</td>
                  </tr>
                  <tr className="p-5">
                    <td>
                      <Image src="" />
                      Whole Wheat
                    </td>
                    <td>Qty:</td>
                  </tr>
                  <tr className="p-5">
                    <td>
                      <Image src="" />
                      Corn Flakes
                    </td>
                    <td>Qty:</td>
                  </tr>
                  <tr className="bg-lightblue p-5">
                    <td>Total</td>
                    <td className="fw-bold">5,590</td>
                  </tr>
                  <tr className="bg-lightblue p-5">
                    <td colspan="2">
                      <Link to="/payment">
                        <Button variant="primary">Place Order</Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShippingScreen;
