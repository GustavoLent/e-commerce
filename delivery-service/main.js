import streamListenerService from "./services/streamListener/streamListenerService.js"

(async function main() {
  await streamListenerService.initializeConsumer()
  await streamListenerService.startListening()
})()
