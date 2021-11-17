import React, { useState, useEffect } from "react";
import "../styles.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhoneNumber(userInfo.phoneNumber);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, phoneNumber, password })
      );
    }
  };

  return (
    <div>
      <Container>
        <h2 className="p-4">Account Details</h2>
        {message && <Message variant="danger">{message}</Message>}
        {}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="float-start fw-bold">Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    rows={1}
                    cols={2}
                  />
                </Form.Group>
                {/* <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="float-start fw-bold">
                    Last Name
                  </Form.Label>
                  <Form.Control as="textarea" rows={1} cols={2} />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="float-start fw-bold">
                    Display Name
                  </Form.Label>
                  <Form.Control as="textarea" rows={1} cols={2} />
                </Form.Group> */}
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="float-start fw-bold">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    rows={1}
                    cols={2}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="float-start fw-bold">
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    rows={1}
                    cols={2}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="m-4">
                  Save Changes
                </Button>
              </Col>
              <h2 className="p-4">Change Password</h2>
              <Col md={6}>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="float-start fw-bold">
                    New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rows={1}
                    cols={2}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="float-start fw-bold">
                    Confirm New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    rows={1}
                    cols={1}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="m-4">
                  SAVE CHANGES
                </Button>
                <Link to="/">
                  <Button variant="primary" type="submit" className="m-4">
                    CANCEL
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
