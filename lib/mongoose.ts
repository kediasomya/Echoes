import mongoose from "mongoose";
let isConnected = false;

export const connectToDb = async () => {
    mongoose.set("strictQuery", true);

    if(!process.env.MONGODB_URL) {
        return console.error("MONGODB_URL not found");
    }
    if(isConnected)
    {
        return console.log("MongoDB is already connected");
        
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL)
       isConnected = true;
       console.log("MongoDB connected successfully");

    }catch(error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}