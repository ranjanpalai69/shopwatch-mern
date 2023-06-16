import {
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_REQUEST_FAILUE,
  ADD_WISHLIST_REQUEST_SUCESS,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_REQUEST_FAILUE,
  GET_WISHLIST_REQUEST_SUCESS,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_REQUEST_FAILUE,
  REMOVE_WISHLIST_REQUEST_SUCESS,
} from "../../../Constant/actionTypes";

const initialWishlistState = {
  isLoading: false,
  isError: "",
  data: [],
};

function wishlistReducer(state = initialWishlistState, action) {
  switch (action.type) {
    case ADD_WISHLIST_REQUEST:
    case GET_WISHLIST_REQUEST:
    case REMOVE_WISHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_WISHLIST_REQUEST_SUCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        data: [...state.data, action.payload],
      };

    case GET_WISHLIST_REQUEST_SUCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        data: action.payload,
      };
    case REMOVE_WISHLIST_REQUEST_SUCESS:
      // console.log(" state.data::-", state.data);
      // console.log("action payload:-",action.payload);

      const updatedData = state.data.filter(
        (item) => item.productId._id !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        isError: null,
        data: updatedData,
      };
    case ADD_WISHLIST_REQUEST_FAILUE:
    case GET_WISHLIST_REQUEST_FAILUE:
    case REMOVE_WISHLIST_REQUEST_FAILUE:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    default:
      return state;
  }
}

export default wishlistReducer;
