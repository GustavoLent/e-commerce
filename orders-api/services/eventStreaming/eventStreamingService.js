import { Kafka, CompressionTypes, logLevel } from 'kafkajs'

class EventStreamingService {
    constructor() {
        this.producer = new Kafka({
            logLevel: logLevel.DEBUG,
            brokers: [process.env.STREAM_HOST],
            clientId: process.env.STREAM_CLIENT,
        }).producer()
        this.topic = process.env.STREAM_TOPIC
    }

    async postOrderOnStream(order) {
        const { producer, topic } = this

        try {
            const message = this.createMessage(order)

            await producer.send({
                topic,
                compression: CompressionTypes.GZIP,
                messages: [message],
            })

        } catch (e) {
            return console.error(`Error streaming new order! Error: ${e}`)
        }
    }

    async initializeProducer() {
        return await this.producer.connect()
    }

    createMessage(order) {
        const value = JSON.stringify(order)

        return {
            key: `${order.id}`,
            value,
        }
    }
}

export default new EventStreamingService()