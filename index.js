import express from "express";
import { config } from "dotenv";
import userRoute from "./Routes/user.js";
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors'
import postRoute from './Routes/post.js'
// import {data} from "./Data/data.js";
// import { isAuthenticated } from "./middlewares/auth.js";
// import {Videos} from './Models/videoData.js'
// import { postVideo } from "./controllers/videoController.js";


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
app.use('/post', postRoute)

config({
    path: './Data/config.env'
})

app.get('/', (req, resp, next) => {
    resp.send("running")
})


app.use(errorMiddleware)





