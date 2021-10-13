import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import barbecueRouter from './controllers/barbecueController.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/barbecue", barbecueRouter)

export default app