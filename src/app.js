import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    //Connection kaha kaha se allowed h 
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"16kb"})) //Kitna json allow krna h 
//Url encoding bhi btana pdega ki url se bhi data aa skta h : eg in yt search space is used as %20
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) //creates public access folder where general things are kept 

app.use(cookieParser())



// routes import
import userRouter from "./routes/user.routes.js"

// Routes declaration
app.use("/api/v1/users", userRouter)

export {app}