const productModal = require("../modals/product.modal");
const decrementProductQuantity = async (productId, quantityToDecrement) => {
    // console.log("productid:-", productId, "quantity:-", quantityToDecrement)
    const product = await productModal.findById(productId);
    if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
    }
    if (product.Stock < quantityToDecrement) {
        throw new Error(`Not enough quantity available for product ${productId}`);
    }
    const StockRemained = product.Stock - quantityToDecrement;
    // console.log("StockRemained::-", StockRemained)
    await productModal.findByIdAndUpdate(productId, { $set: { Stock: StockRemained } });

}
module.exports = decrementProductQuantity