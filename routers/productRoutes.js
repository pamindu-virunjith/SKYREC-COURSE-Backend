import express from 'express'
import { deleteProduct, getProducts, saveProduct } from '../controllers/productController.js';

const productRouters = express.Router();

productRouters.get("/", getProducts)

productRouters.post("/", saveProduct)

productRouters.delete("/:productId",deleteProduct)

export default productRouters

