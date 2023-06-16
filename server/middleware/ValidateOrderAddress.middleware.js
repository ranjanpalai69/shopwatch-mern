// middleware/deliveryAddressMiddleware.js

function deliveryAddressValidation(req, res, next) {
    const address = req.body;
    if (!address.address) {
      return res.status(400).json({ error: "address is required." });
    }
    if (!address.state) {
      return res.status(400).json({ error: "state is required." });
    }

    if (!address.city) {
      return res.status(400).json({ error: "city is required." });
    }
    if (!address.block) {
      return res.status(400).json({ error: "block is required." });
    }
  
  
    if (!address.postalCode) {
      return res.status(400).json({ error: "postalCode is required." });
    }
  
    next();
  }
  
  module.exports = deliveryAddressValidation;
  