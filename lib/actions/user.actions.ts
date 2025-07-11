"use server";

import { profile } from "console";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";


export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}: {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}) : Promise<void> {
    try{
        await connectToDb();
        console.log("Attempting to update user with data:", { userId, username, name, bio, image });
    await User.findOneAndUpdate(
        {
            id:userId,  
            //Query to find the user by id.
        },
        {
            username : username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true,
            //then fil up or update these arguments
        },
        {
            upsert:true
            //update and insert
            // /update if found, otherwise insert a new document".
        }

    );
    console.log("User updated/created successfully");
    
    if(path === './profile./edit'){
         revalidatePath(path); 
         //revalidatePath(path) is a Next.js function that marks the page
         // at path as "stale".
        //The next time someone visits that page, Next.js will fetch 
        // fresh data from the server/database and update the cache.
        //This ensures users always see the most up-to-date information 
        // after an
        //  update.
    }
    
    }
    catch(error:any){
        throw new Error(`Failed to create/update user ${error.message}`)
    }
    
    }
       
export async function fetchUser(userId:string)
{
    try{
        connectToDb();
        return await User
        .findOne({id:userId})
        // .populate({
        //         path: 'communities',
        //         model: Community

        // })
    }
    catch(error:any){
        throw new Error(`failed to fetch user ${error.message}`)

    }
}