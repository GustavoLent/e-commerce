import express from 'express'
import cors from "cors"
import helmet from "helmet"
import ordersRouter from './controllers/ordersController.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/orders", ordersRouter)

export default app