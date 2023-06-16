const validateOrderFields = (req, res, next) => {
  const { products, paymentMethod, orderStatus, deliveryAddressId } = req.body;

  if (!products) {
    return res.status(400).send("Products array is required");
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).send("Products field is invalid");
  }

  for (let i = 0; i < products.length; i++) {
    // console.log("productsId",products[i])
    const product = products[i];
    if (!product.productId) {
      return res.status(400).send("productId field is required in each product object");
    }
  }

  if (!deliveryAddressId) {
    return res.status(400).send("deliveryAddressId is required");
  }

  if(!paymentMethod){
    return res.status(400).send({ message: "PaymentMethod is required" });
  }

  if (!["cashOn", "UPI", "creditCard"].includes(paymentMethod)) {
    return res.status(400).send({ message: "Valid paymentMethod required" });
  }

  if (orderStatus && !["pending", "packed", "dispatch", "cancelled", "delivered"].includes(orderStatus)) {
    return res.status(400).send({ message: "Valid orderStatus required" });
  }

  next();
};

module.exports = validateOrderFields