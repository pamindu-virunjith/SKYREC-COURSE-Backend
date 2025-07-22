import express from 'express'
import { deleteProduct, getProductById, getProducts, saveProduct, searchProducts, updateProduct } from '../controllers/productController.js';

const productRouters = express.Router();

productRouters.get("/", getProducts)

productRouters.post("/", saveProduct)

productRouters.delete("/:productId",deleteProduct)

productRouters.put("/:productId", updateProduct)

productRouters.get("/search/:searchQuery",searchProducts)

productRouters.get("/:productId",getProductById)

export default productRouters

