import mongoose from "mongoose";
let isConnected = false;

export const connectToDb = async () => {
    mongoose.set("strictQuery", true);
    //Ensures that only fields defined in the schema are allowed
    //  in queries (prevents accidental injection of unwanted fields).
    if(!process.env.MONGODB_URL) {
        return console.error("MONGODB_URL not found");
    }
    console.log("MongoDB URL found:", process.env.MONGODB_URL.substring(0, 20) + "...");
    if(isConnected)
    {
        return console.log("MongoDB is already connected");
        //to not make the connections duplicate , it returns
        
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