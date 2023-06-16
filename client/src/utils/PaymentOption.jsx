

const SavePaymentOption=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}

const loadPaymentOption=()=>{
    let data=localStorage.getItem("payOption");

    if(data){
        return JSON.parse(data)
    }else{
        return null;
    }
}

export{
    SavePaymentOption,
    loadPaymentOption
}