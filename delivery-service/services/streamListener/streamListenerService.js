import { Kafka, logLevel } from 'kafkajs'

class StreamListenerService {
    constructor() {
        this.topic = process.env.STREAM_TOPIC
        this.consumer = new Kafka({
            logLevel: logLevel.INFO,
            brokers: [process.env.STREAM_HOST],
            clientId: process.env.STREAM_CLIENT,
        }).consumer({ groupId: process.env.STREAM_CLIENT_GROUP })
    }

    async initializeConsumer() {
        const { consumer, topic } = this

        await consumer.connect()
        await consumer.subscribe({ topic, fromBeginning: true })
    }

    async startListening() {
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                const key = message.key.toString()
                const value = message.value.toString()

                console.log(`- ${prefix} ${key} # ${value}`)
            },
        })
    }
}

export default new StreamListenerService()

// run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

// const errorTypes = ['unhandledRejection', 'uncaughtException']
// const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

// errorTypes.map(type => {
//     process.on(type, async e => {
//         try {
//             console.log(`process.on ${type}`)
//             console.error(e)
//             await consumer.disconnect()
//             process.exit(0)
//         } catch (_) {
//             process.exit(1)
//         }
//     })
// })

// signalTraps.map(type => {
//     process.once(type, async () => {
//         try {
//             await consumer.disconnect()
//         } finally {
//             process.kill(process.pid, type)
//         }
//     })
// })