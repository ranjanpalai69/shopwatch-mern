const  validateUpdateProductFields=(req, res, next)=> {
    const { images, originalPrice, discountPrice, ratings, Stock } = req.body;
  
    if (images !== undefined && (!Array.isArray(images) || images.length === 0)) {
      return res.status(400).json({ error: 'Images must be a non-empty array' });
    }

    if (originalPrice && (typeof originalPrice !== "number" || isNaN(originalPrice) || originalPrice <= 0)) {
        return res.status(400).json({ error: "Invalid originalPrice value" });
      }
      if (discountPrice && (typeof discountPrice !== "number" || isNaN(discountPrice) || discountPrice <= 0)) {
        return res.status(400).json({ error: "Invalid discountPrice value" });
      }
    
      if (Stock && (typeof Stock !== "number" || isNaN(Stock) || Stock <= 0 || Stock > 5)) {
        return res.status(400).json({ error: "Invalid stock value" });
      }

      if (ratings && (typeof ratings !== "number" || isNaN(ratings) || ratings <= 0 || ratings > 5)) {
        return res.status(400).json({ error: "Invalid ratings value" });
      }

    next();
  }

  module.exports=validateUpdateProductFields
  
