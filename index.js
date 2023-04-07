import express from "express";
import { config } from "dotenv";
import userRoute from "./Routes/user.js";
import cookieParser from "cookie-parser"
import taskRoute from "./Routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors'


export const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.use('/users',userRoute)
app.use('/tasks', taskRoute)

config({
    path: './Data/config.env'
})

app.get('/', (req, resp, next) => {
    resp.send("running")
})

app.use(errorMiddleware)





