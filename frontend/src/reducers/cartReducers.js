import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_REMOVE_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_DETAILS_RESET,
} from "../constants/cartConstants";

// export const cartReducer = (
//   state = { cartItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case CART_ADD_REQUEST:
//       const item = action.payload;

//       const existItem = state.cartItems.find((x) => x.product === item.product);

//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }
//     case CART_REMOVE_REQUEST:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };
//     case CART_SAVE_SHIPPING_ADDRESS:
//       return {
//         ...state,
//         shippingAddress: action.payload,
//       };
//     case CART_SAVE_PAYMENT_METHOD:
//       return {
//         ...state,
//         paymentMethod: action.payload,
//       };
//     case CART_CLEAR_ITEMS:
//       return {
//         ...state,
//         cartItems: [],
//       };
//     default:
//       return state;
//   }
// };

export const AddCartReducer = (
  state = { loading: true, cartItems: [] },
  action
) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CART_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CART_DETAILS_RESET:
      return { cartItems: [] };
    default:
      return state;
  }
};

// export const cartDetailsReducer = (
//   state = { loading: true, cartItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case CART_DETAILS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case CART_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         cartItems: action.payload.cartItems,
//       };
//     case CART_DETAILS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case CART_DETAILS_RESET:
//       return { cartItems: [] };
//     default:
//       return state;
//   }
// };

export const cartDetailsReducer = (
  state = { loading: true, cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case "GET_CART_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_CART_SUCCESS":
      //console.log("cart is");
      //console.log(action.payload[0].cartItems);
      return {
        loading: false,
        cartItems: action.payload[0].cartItems,
      };
    case "GET_CART_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    // case "DELETE_CART_REQUEST":
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.filter((x) => x.product !== action.payload),
    //   };
    case CART_DETAILS_RESET:
      return { cartItems: [] };
    default:
      return state;
  }
};
