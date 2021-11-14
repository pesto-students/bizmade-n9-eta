import axios from "axios";

import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_CLEAR_ITEMS,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { logout } from "./userActions";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_REQUEST,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      minQuantity: data.minQuantity,
      maxQuantity: data.maxQuantity,
      manufacturer: data.manufacturer,
    },
  });
  try {
    console.log("cart is ");
    console.log(JSON.stringify(id, qty));
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const cartStuff = await axios.get("/api/cart", {
      params: {
        email: userInfo.email,
      },
    });

    // console.log(cartStuff);

    // console.log("cart stuff");
    // console.log(cartStuff.data);

    const { data2 } = await axios.post(
      `/api/cart/product/${id}`,
      JSON.stringify({
        user: userInfo._id,
        email: userInfo.email,
        cartItems: [
          {
            product: data._id,
            name: data.name,
            image: data.image,
            qty: Number(qty),
            minQuantity: data.minQuantity,
            maxQuantity: data.maxQuantity,
            price: Number(data.price),
            countInStock: "1000",
            manufacturer: data.manufacturer,
          },
        ],
      }),
      config
    );
    dispatch({
      type: CART_ADD_SUCCESS,
      payload: data2,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CART_ADD_FAIL,
      payload: message,
    });
  }
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const getCartDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "/api/cart/",
      {
        params: {
          email: userInfo.email,
        },
      },
      config
    );
    console.log(`Payload ${data}`);

    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: CART_DETAILS_FAIL,
      payload: message,
    });
  }
};

// export const getMyCart = (email) => {

//   console.log('getting my cart');

//   try{
//     const {
//       userLogin: { userInfo },
//     } = getState();
//   }
// }

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_REQUEST,
    payload: id,
  });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // const { data } = await axios.delete(`/api/cart/${id}`, config);

    // dispatch({
    //   type: CART_REMOVE_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
