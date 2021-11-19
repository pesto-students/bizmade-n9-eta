import axios from "axios";

import {
  // WISHLIST_LIST_REQUEST,
  // WISHLIST_LIST_SUCCESS,
  // WISHLIST_LIST_FAIL,
  WISHLIST_ADD_REQUEST,
  // WISHLIST_ADD_SUCCESS,
  // WISHLIST_ADD_FAIL,
  // WISHLIST_DELETE_SUCCESS,
  WISHLIST_DELETE_REQUEST,
  // WISHLIST_DELETE_FAIL,
} from "../constants/wishlistConstants";

import { logout } from "./userActions";
import { baseURL } from "../constants/appConstants.js";

export const addToWishlist = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${baseURL}/api/products/${id}`);

  dispatch({
    type: WISHLIST_ADD_REQUEST,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      minQuantity: data.minQuantity,
      maxQuantity: data.maxQuantity,
    },
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );

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

    const wishListStuff = await axios.get(`${baseURL}/api/wishlist`, {
      params: {
        email: userInfo.email,
      },
    });

    console.log(wishListStuff);

    console.log("wishList stuff");
    console.log(wishListStuff.data);
    const { data2 } = await axios.post(
      `${baseURL}/api/wishlist/product/${id}`,
      JSON.stringify({
        user: userInfo._id,
        email: userInfo.email,
        wishListItems: [
          {
            name: data.name,
            product: data,
            price: Number(data.price),
          },
        ],
      }),
      config
    );
    dispatch({
      type: "WISH_LIST_ADD_SUCCESS",
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
  }
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_DELETE_REQUEST,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

// export const listWishlist = () => async (dispatch) => {
//   try {
//     dispatch({ type: WISHLIST_LIST_REQUEST });

//     const { data } = await axios.get(`/api/wishlist`);

//     dispatch({
//       type: WISHLIST_LIST_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: WISHLIST_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const addProductsToWishlist =
//   (userId, productId) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: WISHLIST_ADD_REQUEST });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.post(
//         `/api/wishlist/product/${productId}`,
//         { userId },
//         config
//       );

//       dispatch({
//         type: WISHLIST_ADD_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: WISHLIST_ADD_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };

// export const deleteWishlistItem = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: WISHLIST_DELETE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     await axios.delete(`/api/wishlist/${id}`, config);

//     dispatch({
//       type: WISHLIST_DELETE_SUCCESS,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: WISHLIST_DELETE_FAIL,
//       payload: message,
//     });
//   }
// };
