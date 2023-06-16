

import {
    ADD_DELIVERY_ADDRESS_FAILURE,
    ADD_DELIVERY_ADDRESS_REQUEST,
    ADD_DELIVERY_ADDRESS_SUCESS,
  
   
  
  } from "../../../Constant/actionTypes";

import {
    DeliverAddressInitialState,
    DeliveryAddressIntial,
  
  
} from "../../../objects/Objects";



const deliveryAddressReducer=(state=DeliveryAddressIntial,{type,payload})=>{

    switch(type){

    case ADD_DELIVERY_ADDRESS_REQUEST:
        return{
            ...state,
            isLoading:true
        }

    case ADD_DELIVERY_ADDRESS_SUCESS:
        return{
            ...state,
            response:payload,
            isLoading:false
        } 
    
    case ADD_DELIVERY_ADDRESS_FAILURE:
        return{
            ...state,
            isError:true,
            isLoading:false
        }    
        default:return state;
    }
}


const AddressReducer = (state = DeliverAddressInitialState, action) => {
  switch (action.type) {
    case "DELIVERY_ADDRESS":
      return {
        ...state,
        deliveryAddress: action.payload
      };
    default:
      return state;
  }
};


export {
 

    deliveryAddressReducer,
    AddressReducer,
 

}