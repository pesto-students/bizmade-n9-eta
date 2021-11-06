import React, { useEffect } from 'react'
import '../styles.css';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import Loader from '../components/Loader'


import { listMyOrders } from '../actions/orderActions.js'


const ManufacOrderHistory = ({ history, match }) => {
    
    const userId = match.params.id;
    const dispatch = useDispatch();
    

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;
    console.log("orders",orders);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userId) {
          dispatch(listMyOrders(userId))
        } else {
          history.push('/login')
        }
      }, [dispatch, history, match, userId])
    
    return (
        <div>
            <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>QTY</th>
              <th>TOTAL</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.qty}</td>
                <td>${order.totalPrice}</td>
                <td>
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>Select Status</option>
                    <option value="1">Processing</option>
                    <option value="2">Delivered</option>
                    <option value="3">Shipped</option>
                    </select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
        </div>
    )
}


export default ManufacOrderHistory


