import {


  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_REQUEST_FAILUE,
  CANCEL_ORDER_REQUEST_SUCCESS,

  GET_ORDERS_REQUEST,
  GET_ORDERS_REQUEST_SUCCESS,
  GET_ORDERS_REQUEST_FAILUE,

  ADD_ORDER_REQUEST,
  ADD_ORDER_REQUEST_SUCCESS,
  ADD_ORDER_REQUEST_FAILUE,

  GET_SINGLE_ORDER_REQUEST,
  GET_SINGLE_ORDER_REQUEST_SUCCESS,
  GET_SINGLE_ORDER_REQUEST_FAILUE,


} from "../../../Constant/actionTypes";

const orderInitial = {
  isLoading: false,
  isError: "",
  orders: [],
  deliveryAddress: {},
  payMethod: "",
  status: ""
};

const getSingleOrderInitial = {
  isLoading: false,
  isError: "",
  order: [],

};


const OrdersReducer = (state = orderInitial, { type, payload }) => {
  switch (type) {
    case ADD_ORDER_REQUEST:
    case GET_ORDERS_REQUEST:
 

      return {
        ...state,
        isLoading: true,
        isError: ""
      };
    case ADD_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: [...state.orders, payload],
        deliveryAddress: {}
      };
    case GET_ORDERS_REQUEST_SUCCESS:

      // console.log("payload data from action for all orders:", payload);
   
      return {
        ...state,
        isLoading: false,
        orders:payload,
        isError: ""
      };


    case ADD_ORDER_REQUEST_FAILUE:
    case GET_ORDERS_REQUEST_FAILUE:
 
      return {
        ...state,
        isLoading: false,
        isError: payload
      };
    default:
      return state;
  }
};


const GetSingleOrderReducer = (state = getSingleOrderInitial, { type, payload }) => {
  switch (type) {

    case GET_SINGLE_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:  
      return {
        ...state,
        isLoading: true,
        isError: ""
      }

    case GET_SINGLE_ORDER_REQUEST_SUCCESS:
      // console.log("payload from action for single order in reducer:",payload);
      return {
        ...state,
        isLoading: false,
        isError: "",
        order:payload,
    
      }

    case CANCEL_ORDER_REQUEST_SUCCESS:
    // console.log("action.payload:",payload);
    // console.log("state.order.products before delete :",state.order.products );
    const updatedOrder= state.order.products.filter(
      (item) => item.productId._id !== payload
    );

    // console.log("state.order.products after delete :",updatedOrder );
    return{
      ...state,
      isLoading: false,
      isError: null,
      order:updatedOrder
    }
        

    case GET_SINGLE_ORDER_REQUEST_FAILUE:
    case CANCEL_ORDER_REQUEST_FAILUE:
      return {
        ...state,
        isLoading: false,
        isError: payload
      }
    default: return state;
  }
}


export {
  OrdersReducer,
  GetSingleOrderReducer
}