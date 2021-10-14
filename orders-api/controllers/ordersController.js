import OrderService from "../services/orders/orderService.js";
import express from "express";

const orderService = new OrderService()
const ordersRouter = express.Router();

ordersRouter.post("/new", async (req, res) => {
    const { amount, destiny, item } = req.body

    try {
        const response = await orderService.postNewOrder(amount, destiny, item)

        if (response.success) {
            return res.status(200).send(response.message);
        }

        res.status(404).send(response.message);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

export default ordersRouter;