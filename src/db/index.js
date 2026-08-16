import dns from "dns";

dns.setServers(["8.8.8.8"]);


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js ";

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    }catch (err){
        console.log(`Mongodb connection error : ${err}`);
        process.exit(1)
    }
}


export default connectDB