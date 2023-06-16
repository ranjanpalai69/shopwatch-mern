const { default: mongoose } = require("mongoose");
const productModal = require("../modals/product.modal");
const userModal = require("../modals/user.modal");

// creating or adding product (admin) 👍👍👍👍

const createProduct = async (req, res) => {
  let product = new productModal(req.body);
  try {
    await product.save()
    res.status(201).send({ message: "product added success" })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}


// get products 👍👍👍👍
const getProducts = async (req, res) => {
  const {
    query,
    category,
    brand,
    minPrice,
    maxPrice,
    ratings,
    _sort,
    _order,
    page = 1,
    limit
  } = req.query;

  let products;

  try {
    const filter = {};

    if (query) {
      filter.title = new RegExp(query, "i");
    }

    if (category) {
      filter.category = category;
    }



    if (brand) {
      filter.brand = brand;
    }


    if (ratings) {
      filter.ratings = ratings;
    }

    if (minPrice && maxPrice) {
      filter.originalPrice = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      filter.originalPrice = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      filter.originalPrice = { $lte: parseInt(maxPrice) };
    }


    const sort = {};

    if (_sort && _order) {
      sort[_sort] = _order;
    }

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const startIndex = (parsedPage - 1) * parsedLimit;

    // console.log("page::-",parsedPage,"limit::-",parsedLimit, "filter::-",filter,"sort::-",sort,"rating::",ratings)

    let totalProducts= await productModal.find()
    let totalPage= Math.floor(totalProducts.length/parsedLimit)

    products = await productModal.find(filter)
      .sort(sort)
      .skip(startIndex)
      .limit(parsedLimit)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ products,totalPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single product 👍👍👍👍


const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  const product = await productModal.findById({ _id: id });

  if (!product) {
    return res.status(404).json({ message: `No product found with id :${id}` });
  }

  try {
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

// update product (admin) 👍👍👍👍

const updateProduct = async (req, res) => {
  const newData = { ...req.body }

  // console.log(Object.keys(req.body)) 
  // output will containe array with all keys that are passing so we know already ["userId"]
  // exits so I written if length 1 then empty error
  if (Object.keys(req.body).length === 1) {
    return res.status(400).json({ message: "Request body is empty or not passed anything except userId so did not updated product." });
  }


  if (!newData.product_id) {
    return res.status(400).send({ message: "Product_id is required" })
  }


  try {
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(newData.product_id)
    // console.log(isObjectIdValid);

    if (!isObjectIdValid) {
      return res.status(400).send({ message: "Invalid product_id" })
    }

    const checkProductExits = await productModal.findById({ _id: newData.product_id })

    if (!checkProductExits) {
      return res.status(400).send({ message: "Product not found" })
    } else {
      await productModal.findByIdAndUpdate({ _id: newData.product_id }, newData)
      res.status(200).send({ message: "Product updated successfully" })
    }

  } catch (error) {
    // console.log(error.name, error.kind);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ message: "Invalid product_id" })
    }
    res.status(500).send({ message: "Server error", error: error.message })
  }
}

// delete product (admin) 👍👍👍👍
const deleteProduct = async (req, res) => {
  let product_Id = req.body.product_id;

  if (!product_Id) {
    return res.status(400).send({ message: "Required product_id " });
  }
  try {
    const isObjectIdValid = mongoose.Types.ObjectId.isValid(product_Id)
    // console.log(isObjectIdValid);

    if (!isObjectIdValid) {
      return res.status(400).send({ message: "Invalid product_id" })
    }

    const checkProductExits = await productModal.findById({ _id: product_Id })

    if (!checkProductExits) {
      return res.status(400).send({ message: "Product not found" })
    } else {
      await productModal.findByIdAndDelete({ _id: product_Id })
      res.status(200).send({ message: "Product deleted success" })
    }

  } catch (error) {

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ message: "Invalid product_id" })
    }
    res.status(500).send({ message: "Server error", error: error.message })
  }
}



// create new review or update 👍👍👍👍

const createReview = async (req, res, next) => {
  try {
    const { rating, comment, productId, userId } = req.body;

    const findUser = await userModal.findById({ _id: userId })

    if (!findUser) {
      return res.status(404).send({ message: "User not found" })
    }

    const review = {
      user: userId,
      name: findUser.name,
      rating: Number(rating),
      comment,
    };

    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "product does not exits" })
    }

    const isUserAlreadyReviewd = product.reviews.find(
      (rev) => rev.user.toString() === userId.toString()
    );


    if (isUserAlreadyReviewd) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === userId.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });



      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      // console.log("total reviews", product.reviews.length);
      // console.log("total rating", avg);
      // console.log("average rating", product.ratings);
      // console.log("product ratings", Math.ceil(avg / product.reviews.length));

      product.ratings = Math.ceil(avg / product.reviews.length);

      await product.save();
      res.status(200).send({
        message: "Review updated"
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      // console.log("total reviews avearge",avg);

      product.ratings = Math.ceil(avg / product.reviews.length);

      await product.save();
      res.status(200).send({
        message: "Review Added"
      });
    }

  } catch (error) {
    next(error);
  }
};


// Get All Reviews of a product 👍👍👍👍

const getAllReviewOfAproduct = async (req, res) => {
  const { productId } = req.body;

  try {
    if (!productId) {
      return res.status(400).send({ message: "Required productId " });
    }
    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "product does not exits" })
    }

    res.status(200).send({
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", err: error.message })
  }
}

// get Single review of  a product 👍👍👍👍

const getSingleReview = async (req, res) => {
  const { productId} = req.body;
  const reviewId =req.params.reviewId 


  try {
    if (!productId) {
      return res.status(400).send({ message: "Required productId" });
    }

    if (!reviewId) {
      return res.status(400).send({ message: "Required reviewId" });
    }

    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product does not exist" });
    }
  

    const review = product.reviews.find(review => review._id.toString() === reviewId);
    if (!review) {
      return res.status(404).send({ message: "Review does not exist" });
    }

    res.status(200).send({
      review,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", err: error.message })
  }
}

// delete a review (SuperAdmin) 👍👍👍👍
const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.body;

  try {
    if (!productId) {
      return res.status(400).send({ message: "Required productId" });
    }

    if (!reviewId) {
      return res.status(400).send({ message: "Required reviewId" });
    }

    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product does not exist" });
    }

    const review = product.reviews.find(rev => rev._id.toString() === reviewId);
    if (!review) {
      return res.status(404).send({ message: "Review does not exist" });
    }

    // remove the review from the reviews array
    const filteredReviews = product.reviews.filter(rev => rev._id.toString() !== reviewId);
    product.reviews = filteredReviews;

    // update the product's ratings and numOfReviews fields after removing review
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    const numOfReviews = product.reviews.length;
    const averageRating = totalRating / numOfReviews;
    product.ratings = parseFloat(averageRating.toFixed(1));
    product.numOfReviews = numOfReviews;

    await product.save();
    res.status(200).send({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", err: error.message })
  }
}


module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,

  createReview,
  getAllReviewOfAproduct,
  getSingleReview,
  deleteReview 

}