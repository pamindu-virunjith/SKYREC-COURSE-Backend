import express from 'express'
import { crateOrder } from '../controllers/orderCntroller.js';

const orderRouter  = express.Router();

orderRouter.post("/",crateOrder)

export default orderRouter;