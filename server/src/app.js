import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



app.use(express.json({limit: "50kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"));


import userRouter from './routes/user.routes.js'
import carRouter from "./routes/car.routes.js";

app.use("/api/users", userRouter);
app.use("/api/cars", carRouter);


app.get('*',(req, res) => {
    res.send('Sorry !! 404 Not Found');
});


export { app }