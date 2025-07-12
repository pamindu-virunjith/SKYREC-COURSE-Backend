import express from 'express'
import { crateOrder, getOrders, updateOrderStatus } from '../controllers/orderCntroller.js';

const orderRouter  = express.Router();

orderRouter.post("/",crateOrder)
orderRouter.get("/",getOrders)
orderRouter.put("/:orderId/:status",updateOrderStatus)

export default orderRouter;