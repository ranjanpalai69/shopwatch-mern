const deliveryAddressModel = require("../modals/DeliveryOrderAddress.modal");

const createDeliveryAddress = async (req, res) => {
  const { address,city,state,postalCode,block,userId } = req.body;

  try {
    const deliveryAddress = new deliveryAddressModel({
      address,
      state,
      city,
      block,
      postalCode,
      user:userId
    });

    const savedDeliveryAddress = await deliveryAddress.save();
    res.status(201).send({deliveryAddressId: savedDeliveryAddress._id, message: "Delivery address created successfully",hint:"deSuces"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = createDeliveryAddress;
