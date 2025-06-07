import express from 'express'
import { crateOrder, getOrders } from '../controllers/orderCntroller.js';

const orderRouter  = express.Router();

orderRouter.post("/",crateOrder)
orderRouter.get("/",getOrders)


export default orderRouter;