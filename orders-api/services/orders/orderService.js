import IncommingOrderModel from "../../models/incommingOrderModel.js";
import OrderModel from "../../models/orderModel.js";
import ResponseModel from "../../models/responseModel.js";
import eventStreamingService from "../eventStreaming/eventStreamingService.js";

export default class OrderService {
    constructor() {
        this.eventStreamingService = eventStreamingService
    }

    async postNewOrder(amount, destiny, item) {
        const { eventStreamingService } = this

        try {
            const incommingOrder = new IncommingOrderModel(amount, destiny, item)

            const isValidOrder = await this._validateOrderByItemAndAmount(incommingOrder)

            if (!isValidOrder)
                return ResponseModel.errorResponse('Pedido indisponível')

            const orderID = await this._insertOrderInDatabaseAndGetID(incommingOrder)
            const order = new OrderModel(amount, destiny, orderID, item)

            await eventStreamingService.postOrderOnStream(order)
            return ResponseModel.successResponse('Pedido cadastrado com sucesso!')

        } catch (error) {
            return ResponseModel.errorResponse(error.message)
        }
    }

    async _validateOrderByItemAndAmount(amount, item) {
        // query the database to validate if the item is available, etc

        return true
    }

    async _insertOrderInDatabaseAndGetID(incommingOrder) {
        return Math.round(Math.random(10) * 1000)
    }
}
