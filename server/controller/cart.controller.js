
const cartModal = require("../modals/cart.modal");
const productModal = require("../modals/product.modal");
const decrementProductQuantity = require("./decrementProductQuantity.controller");

// add product to cart 👍👍👍👍👍
const addProductToCart = async (req, res) => {
    const { quantity, productId } = req.body;
    const { userId } = req.body
    // console.log("productid:", productId, "userId:-", userId)


    if (!quantity || !productId) {
        return res.status(400).send({ message: "productId and quantity required " })
    }

    if (typeof quantity !== "number") {
        return res.status(400).send({ message: " quantity should be number " })
    }

    try {
        // check if the user has an existing cart
        let cart = await cartModal.findOne({ user: userId });

        if (!cart) {
            cart = new cartModal({
                user: userId,
                products: [{ product_id: productId, quantity: quantity }],
            });
            await decrementProductQuantity(productId, quantity);
        } else {
            // check if the product already exists in the cart
            const existingProduct = cart.products.find(
                (p) => p.product_id.toString() === productId
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
                await decrementProductQuantity(productId, quantity);
                await cart.save();
                return res.status(200).send({ msg: "product quantity updated in cart" });
            } else {
                cart.products.push({ product_id: productId, quantity: quantity });
                await decrementProductQuantity(productId, quantity);
            }
        }


        // save the cart and send a response
        await cart.save();
        res.status(200).send({ msg: "product added to cart successs" });
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong in the server", err: error.message });
    }
}

// get cart product(s) 👍👍👍👍👍

const getCartData = async (req, res) => {
    const { userId } = req.body

    try {
        const cartData = await cartModal
            .find({ user: userId })
            .populate({
                path: 'products.product_id',
                model: 'product'
            })
            .lean();

        if (!cartData || cartData.length === 0 || cartData[0].products.length === 0) {
            return res.status(404).send({ msg: 'No cart data found for this user' });
        }


        const cartItems = [];

        let totalPrice = 0;

        // console.log("cartdata::-", cartData)

        cartData.forEach((cart) => {
            // console.log("for each cart",cart)
            cart.products.forEach((product) => {
                // console.log("Each iteration object:-",product)

                const quantity = product.quantity;
                const price = product.product_id.discountPrice;

                const total = quantity * price;
                totalPrice += total;

                // console.log(quantity,"quantity", price,"price")
                cartItems.push({
                    quantity: product.quantity,
                    product: product.product_id
                });
            });
        });

        const totalProducts = cartData.reduce((acc, cart) => {
            return acc + cart.products.reduce((acc, product) => {
                return acc + product.quantity;
            }, 0);
        }, 0);

        // console.log(totalPrice,"totalprice")

        res.status(200).send({ cartItems, totalPrice: totalPrice,totalProducts });
    } catch (error) {
        res.status(500).send({ msg: 'Something went wrong in the server', err: error.message });
    }

};

// remove cart product 👍👍👍👍👍

const removeProductFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    if (!productId) {
        return res.status(400).send({ message: "productId required " })
    }

    try {
        const cart = await cartModal.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send({ message: "Cart data not found for the user" });
        }

        const productIndex = cart.products.findIndex(p => p.product_id.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).send({ message: "Product not found in the cart" });
        }

        const product = cart.products[productIndex];

        //   console.log("product",product)
        /// product_id
        // quantity

        cart.products.splice(productIndex, 1);

        // Increment the stock of the product when user remove product from cart
        await productModal.findByIdAndUpdate(productId, { $inc: { Stock: product.quantity } });

        // saving the updated data back to databse
        await cart.save();
        res.status(200).send({ msg: "Product removed from the cart" });
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong in the server", err: error.message });
    }
}



// remove all cart product 👍👍👍👍👍

const removeAllProductsFromCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await cartModal.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send({ message: "Cart data not found for the user" });
        }

        // Remove all products from the cart
        cart.products = [];

        // saving the updated data back to database
        await cart.save();

        res.status(200).send({ msg: "All products removed from the cart", hint: "reAlSuc" });
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong in the server", err: error.message });
    }
}


// increment cart quantity 👍👍👍👍👍

const incrementProductQuantityInCart = async (req, res) => {
    const { userId, productId } = req.body;

    if (!productId) {
        return res.status(400).send({ message: "productId required " })
    }

    try {
        const cart = await cartModal.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found for the user" });
        }

        const product = cart.products.find(p => p.product_id.toString() === productId);

        if (!product) {
            return res.status(404).send({ message: "Product not found in the cart" });
        }

        // console.log("cart product:-", product)
        product.quantity += 1;

        // Decrement the stock of the product
        await decrementProductQuantity(productId, 1);
        await cart.save();
        res.status(200).send({ msg: "Product quantity incremented in the cart", hint: "incQty" });
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong in the server", err: error.message });
    }
}

// decrement cart quantity 👍👍👍👍👍

const decrementProductQuantityInCart = async (req, res) => {
    const { userId, productId } = req.body;

    if (!productId) {
        return res.status(400).send({ message: "productId required " })
    }

    try {
        const cart = await cartModal.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found for the user" });
        }

        const productIndex = cart.products.findIndex(p => p.product_id.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).send({ message: "Product not found in the cart" });
        }

        const product = cart.products[productIndex];

        if (product.quantity === 1) {
            // If the cart product quantity becomes 1, remove the cart product from the cart
            cart.products.splice(productIndex, 1);
            // Increment the stock of the product by 1
            await productModal.findByIdAndUpdate(productId, { $inc: { Stock: 1 } });

            // save the cart and send a response
            await cart.save();
            return res.status(200).send({ message: `Cart item removed since this product : ${productId} quantity has become 0` });
        } else {
            // Decrement the product quantity by 1
            product.quantity--;

            // Increment the stock of the product by 1
            await productModal.findByIdAndUpdate(productId, { $inc: { Stock: 1 } });

            // save the cart and send a response
            await cart.save();
            return res.status(200).send({ msg: `Product quantity decremented successfully in the cart`, hint: "decQty" });
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong in the server", error: error.message });
    }
}


module.exports = {
    addProductToCart,
    getCartData,
    removeProductFromCart,
    removeAllProductsFromCart,
    incrementProductQuantityInCart,
    decrementProductQuantityInCart
}