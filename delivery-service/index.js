import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [process.env.STREAM_HOST],
  clientId: process.env.STREAM_CLIENT,
})

const topic = process.env.STREAM_TOPIC
const consumer = kafka.consumer({ groupId: process.env.STREAM_CLIENT_GROUP })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      const key = message.key.toString()
      const value = message.value.toString()

      console.log(`- ${prefix} ${key} # ${value}`)
    },
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})