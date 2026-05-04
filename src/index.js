import mongoose, { mongo } from 'mongoose'
import {DB_NAME} from './constants'

import express from 'express'
const app = express();

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        app.on("error", (error)=>{
            console.log("Application not able to talk to db");
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on Port : ${process.env.PORT}`);
        })

    } catch(error){
        console.error("Error: ", error)
        throw error
    }
} )()