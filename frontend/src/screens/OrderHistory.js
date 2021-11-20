import React, { useEffect } from "react";
import "../styles.css";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  listMyOrders,
  listManufacturerOrders,
  orderStatus,
} from "../actions/orderActions.js";

const OrderHistory = ({ history, match }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  var { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const ordersStatus = useSelector((state) => state.orderStatus);
  var {
    loading: loadingOrdersStatus,
    error: errorOrdersStatus,
    success,
  } = ordersStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isManufacturer) {
        dispatch(listManufacturerOrders(userInfo.name));
      } else {
        dispatch(listMyOrders(userId));
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, userId, success]);

  return (
    <div>
      <>
        <h3 className="m-3 fw-bold">{userInfo.name}'s Orders</h3>
        {/* <p>{userInfo._id}</p> */}
        {loadingOrders || loadingOrdersStatus ? (
          <Loader />
        ) : errorOrders || errorOrdersStatus ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <>
            {!userInfo.isManufacturer ? (
              <Table striped bordered hover responsive className="table-sm">
                <thead className="bg-blue white">
                  <tr>
                    <th>ORDER ID</th>
                    <th>PRODUCT</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <>
                      {order.orderItems.map((o) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{o.name}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>₹{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <i
                                className="fas fa-check"
                                style={{ color: "green" }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>{o.status}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead className="bg-blue white">
                  <tr>
                    <th>ORDER ID</th>
                    <th>PRODUCT</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>STATUS</th>
                    <th>SET STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <>
                      {order.orderItems.map((o) => (
                        <>
                          {o.manufacturer === userInfo.name ? (
                            <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{o.name}</td>
                              <td>{order.createdAt.substring(0, 10)}</td>
                              <td>₹{order.totalPrice}</td>
                              <td>
                                {order.isPaid ? (
                                  <i
                                    className="fas fa-check"
                                    style={{ color: "green" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fas fa-times"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </td>
                              <td>
                                <option value={o.status}>{o.status}</option>
                              </td>
                              <td>
                                <select
                                  name="status"
                                  id="status"
                                  onChange={(e) => {
                                    e.preventDefault();
                                    dispatch(
                                      orderStatus({
                                        _id: o._id,
                                        status: `${e.target.value}`,
                                      })
                                    );
                                    // dispatch(
                                    //   listManufacturerOrders(userInfo.name)
                                    // );
                                    // window.location.reload();
                                  }}
                                >
                                  <option value="none" selected disabled hidden>
                                    Select Status
                                  </option>
                                  <option value="Order Placed">
                                    Order Placed
                                  </option>
                                  <option value="Processing">Processing</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default OrderHistory;
