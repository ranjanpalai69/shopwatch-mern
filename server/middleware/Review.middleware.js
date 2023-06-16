const  validateReviewData= (req, res, next)=>{
    const { rating, comment,productId } = req.body;
     
    if(!rating || !comment){
        return res.status(400).json({ message: "rating and comment required" });
    }
    if(!productId){
        return res.status(400).json({ message: "productId is required" }); 
    }
    if (rating && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
        return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
    }
  
    if (comment && comment.length > 500) {
      return res.status(400).json({ message: "Comment must be less than 500 characters" });
    }
  
    next();
  }

  module.exports=validateReviewData