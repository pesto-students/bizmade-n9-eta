import {
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_SUCCESS,
  WISHLIST_LIST_FAIL,
  WISHLIST_ADD_REQUEST,
  WISHLIST_ADD_SUCCESS,
  WISHLIST_ADD_FAIL,
  WISHLIST_DELETE_SUCCESS,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_FAIL,
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case WISHLIST_ADD_REQUEST:
      const item = action.payload;

      const existItem = state.wishlistItems.find(
        (x) => x.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }
    case WISHLIST_DELETE_REQUEST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (x) => x.product !== action.payload
        ),
      };

    default:
      return state;
  }
};

// export const wishlistReducer = (state = { wishlist: [] }, action) => {
//     switch (action.type) {
//         case WISHLIST_LIST_REQUEST:
//             return { loading: true, wishlist: [] }
//         case WISHLIST_LIST_SUCCESS:
//             return {
//                 loading: false,
//                 wishlist: action.payload.wishlist,
//                 pages: action.payload.pages,
//                 page: action.payload.page,
//             }
//         case WISHLIST_LIST_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }
//
// export const WishlistCreateReducer = (
//     state = { wishlist: [] },
//     action
// ) => {
//     switch (action.type) {
//         case WISHLIST_ADD_REQUEST:
//             return { ...state, loading: true }
//         case WISHLIST_ADD_SUCCESS:
//             return { loading: false, wishlist: action.payload }
//         case WISHLIST_ADD_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }

// export const wishlistDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//         case WISHLIST_DELETE_REQUEST:
//             return { loading: true }
//         case WISHLIST_DELETE_SUCCESS:
//             return { loading: false, success: true }
//         case WISHLIST_DELETE_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }
