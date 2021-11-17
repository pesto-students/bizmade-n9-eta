import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const Register = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isManufacturer, setIsManufacturer] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, isManufacturer));
    console.log(error);
  };

  return (
    <FormContainer>
      <h2 style={{ color: "#0fafe9", textAlign: "initial" }}>Sign Up</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label style={{ float: "left", margin: "6px 0" }}>
            Name
          </Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label style={{ float: "left", margin: "6px 0" }}>
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label style={{ float: "left", margin: "6px 0" }}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col>
            <Button
              style={{ margin: "30px 0" }}
              type="submit"
              variant="primary"
              onClick={() => {
                setIsManufacturer(false);
              }}
            >
              REGISTER AS DEALER
            </Button>
          </Col>
          <Col>
            <Button
              style={{ margin: "30px 0" }}
              type="submit"
              variant="primary"
              onClick={() => {
                setIsManufacturer(true);
              }}
            >
              REGISTER AS MANUFACTURER
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
