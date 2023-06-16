const signupInitial = {
    isLoading: false,
    isError: false,
    data: []
}

const loginInitial = {
    isLoading: false,
    isError: false,
    isAuth: false
}

const forgetPasswordInitial = {
    isLoading: false,
    isError: false,
    response: ""
}

const resetPasswordIntial = {
    isLoading: false,
    isError: false,
    response: ""
}

const changePasswordInitialState={
    email: "",
    currentPassword: "",
    newPassword: "",
}

const changePasswordInitial={
    isLoading:false,
    isError:"",
    response:""
}



const ResetIntitialState = {
    password: "",
    confirmPassword: ""
}

const signupIntialState = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    avator: "",
    mobile: ""
}

const loginInitialState = {
    email: "",
    password: ""
}
const initialMessages = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
    emailExits: "",
    success: "",
    invalid: ""
};


const getProductIntial = {
    isLoading: false,
    products: [],
    isError: false,
    totalProductspage:null,
}

const getProductDetailsInitial = {
    isLoading: false,
    product: {},
    isError: false
}

const addReviewInitial = {
    isLoading: false,
    addReview: {},
    isError: false
}

const addReviewInitiaState = {
    name: "",
    rating: "",
    comment: ""
}

const AddtoCartIntial = {
    isLoading: false,
    isError: false,
    response: ""
}


const getCartDataIntial = {
    isLoading: false,
    isError: false,
    response: []
}

const removeSingleCart = {
    isLoading: false,
    isError: false,
    response: ""
}

const removeAllCart = {
    isLoading: false,
    isError: false,
    response: ""
}

const DeliverinitialState = {
    address: "",
    block: "",
    state: "",
    city: "",
    postalCode: "",

}
const DeliveryAddressIntial = {
    isLoading: false,
    isError: false,
    response: ""
}

const DeliverAddressInitialState = {
    deliveryAddress: {}
};


const addOrderIntial = {
    isLoading: false,
    isError: false,
    response: ''
}

const intitialStateForget = {
  resetPassword: "",
  resetPasswordConfirmPassword: ""
}




export {
    signupInitial,
    loginInitial,
    forgetPasswordInitial,
    resetPasswordIntial,
    changePasswordInitialState,
    changePasswordInitial,
    ResetIntitialState,
    signupIntialState,
    loginInitialState,
    initialMessages,
    getProductIntial,
    getProductDetailsInitial,
    addReviewInitial,
    addReviewInitiaState,
    AddtoCartIntial,
    getCartDataIntial,
    removeSingleCart,
    removeAllCart,
    DeliverinitialState,
    DeliveryAddressIntial,
    DeliverAddressInitialState,
    addOrderIntial,
    intitialStateForget,
 




}