

import mongoose from "mongoose";

export const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Successfully connected to MongoDB");
    } catch(err){
        console.log("Error connecting to MongoDB", err);
    }
}