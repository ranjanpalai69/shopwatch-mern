
const Wishlist = require("../modals/wishlist.modal");

// create wislist or add to wishlist 👍👍👍👍

const addToWishList = async (req, res) => {
  const { userId, productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    let wishlist = await Wishlist.findOne({ userId })
      .populate({
        path: 'products.productId',
        model: 'product'
      });

    if (!wishlist) {
      // If user's wishlist doesn't exist, create a new document
      wishlist = new Wishlist({ userId });
    } else {
      // If user's wishlist already exists, check if product exists in the array
      const productExists = wishlist.products.some(
        (product) => product.productId._id.toString() === productId
      );

      if (productExists) {
        return res.status(400).json({ message: 'Product already exists in wishlist' });
      }
    }

    // Add the new product to the wishlist and save the document
    wishlist.products.push({ productId });
    const newWishlist = await wishlist.save();

    // Populate the productId field of the newly added product in the response
    const populatedWishlist = await Wishlist.findOne({ _id: newWishlist._id })
      .populate({
        path: 'products.productId',
        model: 'product'
      })
      .lean();

    return res.status(201).json({ message: 'Product added to wishlist', newWishlist: populatedWishlist });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};





// get wishlist 👍👍👍👍
const getWishlist = async (req, res) => {
  const { userId } = req.body

  try {
    // Find the user's wishlist and populate 
    const wishlist = await Wishlist
      .find({ userId })
      .populate({
        path: 'products.productId',
        model: 'product'
      })
      .lean();

    //  console.log("wishlist::-",wishlist);   
    if (!wishlist || wishlist.length === 0) {
      return res.status(404).send({ msg: 'Wishlist not found' });
    } else {
      return res.status(200).json(wishlist);
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error", err: error.message });
  }
}


// remove wishlist 👍👍👍👍

const removeFromWishlist = async (req, res) => {

  const { userId, productId } = req.body;

  if (!productId) {
    return res.status(400).json({ msg: "productId required" });
  }

  try {
    // Find all wishlists of the user
    const wishlists = await Wishlist.find({ userId });

    // Check if the user has any wishlists
    if (!wishlists || wishlists.length === 0) {
      return res.status(404).send({ msg: "Wishlist not found" });
    }

    let productFound = false;

    // Loop through all wishlists to find the product to remove
    for (let i = 0; i < wishlists.length; i++) {
      const wishlist = wishlists[i];
      const productIndex = wishlist.products.findIndex(
        (p) => p.productId.toString() === productId.toString()
      );
      if (productIndex !== -1) {
        // Remove the product from the wishlist
        wishlist.products.splice(productIndex, 1);

        if (wishlist.products.length === 0) {
          // Remove the wishlist if it has no products left
          await Wishlist.findByIdAndDelete(wishlist._id);
        } else {
          await wishlist.save();
        }

        productFound = true;
      }
    }

    if (productFound) {
      return res
        .status(200)
        .json({ msg: "Product removed from wishlist", hint: "reSuc" });
    } else {
      return res.status(404).json({ msg: "Product not found in wishlist" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error", err: error.message });
  }
};



module.exports = {
  addToWishList,
  getWishlist,
  removeFromWishlist
}