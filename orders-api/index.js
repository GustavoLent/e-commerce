import app from './app.js'
import streaming from './services/eventStreaming/eventStreamingService.js'

streaming.initializeProducer().then(() => {
    const port = process.env.PORT

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

})

