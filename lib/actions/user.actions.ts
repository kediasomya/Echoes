"use server";

import { profile } from "console";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
import { getJsPageSizeInKb } from "next/dist/build/utils";
import { SortOrder } from "mongoose";
import { FilterQuery } from "mongoose";
import Echo from "../models/echo.models";

import Community from "../models/community.models";



interface pp{
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}: pp) : Promise<void> {
    try{
         connectToDb();
        //console.log("Attempting to update user with data:", { userId, username, name, bio, image });
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
        //User is a mongodb model
        //in user.models.ts
        return await User
        .findOne({id:userId})
        .populate({
                path: 'communities',
                model: Community

        })
    }
    catch(error:any){
        throw new Error(`failed to fetch user ${error.message}`)

    }
}

export async function fetchUsers({
    userId,
    pageNumber =1,
    pageSize =20,
    searchString="",
    sortBy ="desc"
}:{
    userId:string;
    pageNumber?:number;
    pageSize?: number;
    searchString?:string;
    sortBy?: SortOrder
}
){
    try{
        connectToDb();
        const skips = (pageNumber-1)* pageSize;
        const regex = new RegExp(searchString , "i");
        //i means case insensitive here

        const query:FilterQuery<typeof User> = {
            id:{$ne: userId}
           
        }
         if(searchString.trim()!==''){
            query.$or=[
                {username :{$regex: regex}},
                {name :{$regex: regex}},
            ]
         }

         const sorting = {createdAt: sortBy};
         const userQuery = User.find(query)
         .sort(sorting)
         .skip(skips)
         .limit(pageSize);

         const totalUserCount = await User.countDocuments(query);

         const users = await userQuery.exec();
         const isNext = totalUserCount> skips +users.length;

         
         return {users , isNext};  

    }
    catch(error:any){
             throw new Error(`failed to fetch users with the searched id  ${error.message}`)
    }
}

export async function getActivity(userId:string)
{
    try{
        connectToDb();
        //finding all the threads created by the user
        const userEcho = await Echo.find({author:userId})

        //collecting child thread ids of that threads
        const childEchoIds = userEcho.reduce((acc,userEcho  ) => {
            return acc.concat(userEcho.children);
        },[]);
        //childEchoIds is an array of all the child thread _ids
        //the reduce thing makes the child thread ids into a single array
        //[] is the default arrayy


        const replies = await Echo.find({
            _id:{$in:childEchoIds},
            //author:{$ne:userId}
            //this means that the replies should not be from the user itself

        })
        .sort({createdAt : 'desc'})
        .populate({
            path: 'author',
            model: User,
            select: 'name image _id'
        })

        return replies;

    }
    catch(error:any){
        throw new Error(`failed to fetch user activities ${error.message}`)
    }
}