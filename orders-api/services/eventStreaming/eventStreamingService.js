export default class EventStreamingService {
    constructor() {
        this.producer = new Kafka({
            logLevel: logLevel.DEBUG,
            brokers: [`${host}:9092`],
            clientId: 'example-producer',
        }).producer()
    }

    async postOrderOnStream(order) {
        const { producer } = this

        try {
            const message = createMessage(order)

            await producer.connect()

            await producer.send({
                topic,
                compression: CompressionTypes.GZIP,
                messages: [message],
            })

            await producer.disconnect()
        } catch (e) {
            return console.error(`Error streaming new order! Error: ${e}`)
        }
    }

    createMessage(order) {
        return {
            key: order.id,
            value: order,
        }
    }

}