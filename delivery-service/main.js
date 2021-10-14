import streamListenerService from "./services/streamListener/streamListenerService.js"

(async function main() {
  console.log('Starting consumer...')

  try {

    await streamListenerService.initializeConsumer()
    await streamListenerService.startListening()
    console.log('Consumer is listenning!')

  } catch (error) {
    console.error(`Error initializing consumer. '${error}'`)
  }

})()
