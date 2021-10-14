import { Kafka, logLevel } from 'kafkajs'
import OrderDestinyModel from '../../models/orderDestinyModel.js'
import OrderFromStreamModel from '../../models/orderFromStreamModel.js'
import DeliveryService from '../delivery/deliveryService.js'

class StreamListenerService {
    constructor() {
        this.consumer = new Kafka({
            logLevel: logLevel.INFO,
            brokers: [process.env.STREAM_HOST],
            clientId: process.env.STREAM_CLIENT,
        }).consumer({ groupId: process.env.STREAM_CLIENT_GROUP })
        this.deliveryService = new DeliveryService()
        this.topic = process.env.STREAM_TOPIC
    }

    async initializeConsumer() {
        const { consumer, topic } = this

        await consumer.connect()
        await consumer.subscribe({ topic, fromBeginning: true })
    }

    async startListening() {
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const valueAsString = message.value.toString()
                    const data = JSON.parse(valueAsString)

                    const destiny = new OrderDestinyModel(data.destiny.state, data.destiny.city, data.destiny.address)
                    const incommingOrder = new OrderFromStreamModel(data.amount, destiny, data.id, data.item)

                    await this.deliveryService.processNewOrder(incommingOrder)
                } catch (error) {
                    console.error(`Error getting data from incomming order! '${error}'`)
                }
            },
        })
    }
}

export default new StreamListenerService()