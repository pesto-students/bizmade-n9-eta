import React, { useEffect } from "react";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";

const OrderConfirmation = ({ match, history }) => {
  const orderId = match.params.id;
  const date = Date(Date.now()).toString().split("GMT")[0];
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.isManufacturer) {
      history.push("/login");
    }
  }, []);
  // const orderDetails = useSelector((state) => state.orderDetails);
  // const { order, loading, error } = orderDetails;
  return (
    <div>
      <Container>
        <h2 className="p-5">Thank You. Your order has been placed</h2>
        <Row>
          <Col md={4}>
            <p className="fw-bold">Order Number</p>
            <p>{orderId}</p>
          </Col>
          <Col md={4}>
            <p className="fw-bold">Date</p>
            <p>{date}</p>
          </Col>
          <Col md={4}>
            <p className="fw-bold">Payment Status</p>
            <p>Paid</p>
          </Col>
        </Row>
        {/* <Row>
          <h2 className="p-4">Order Details</h2>
          <Table className="table">
            <thead className="bg-lightblue">
              <tr>
                <th scope="col">Products</th>
                <th scope="col">Price</th>
                <th scope="col">Qunatity</th>
                <th scope="col">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="p-5">
                <td>
                  <Image src="" />
                  Cooking Oil
                </td>
                <td>2290</td>
                <td>Qty:</td>
                <td>2,290</td>
              </tr>
              <tr className="p-5">
                <td>
                  <Image src="" />
                  Whole Wheat
                </td>
                <td>3,290</td>
                <td>Qty:</td>
                <td>3,290</td>
              </tr>
              <tr className="p-5">
                <td>
                  <Image src="" />
                  Corn Flakes
                </td>
                <td>3,590</td>
                <td>Qty:</td>
                <td>3,590</td>
              </tr>
              <tr className="bg-lightblue p-5">
                <td>Total</td>
                <td></td>
                <td></td>
                <td className="fw-bold">9,170</td>
              </tr>
            </tbody>
          </Table>
        </Row> */}
        <Row>
          <Col md={12} style={{ marginTop: "30px" }}>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
            <Link to={`/orders/${userInfo._id}`}>
              <Button type="submit" variant="primary">
                My Orders
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderConfirmation;
