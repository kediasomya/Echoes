"use server";

import { revalidatePath } from "next/cache";
import Echo from "../models/echo.models";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";
interface Params{
    text:string,
    author:string,
    communityId:string | null,
    path :string,
}

export async function createEcho({
    text,author,communityId,path
    }: Params) {
    try{
        connectToDb();
            //Echo is a mongodb model ,just like User was
            //in echo.models.ts
        const user = await User.findOne({ id: author }); // 'id' is Clerk user id
        if (!user) throw new Error("User not found");
        const createdEcho = await Echo.create({
            text,
            author: user._id, // Use MongoDB ObjectId
            community: null,
        });

        await User.findByIdAndUpdate(
            user._id,{
                $push:{echoes:createdEcho._id}
            }
        )

        revalidatePath(path);
    }
        catch(error:any)
        {
            throw new Error(`error creating thread: ${error.message}`)
        }
}


export async function fetchPosts(pageNumber=1 , pageSize =20)
{

    
    connectToDb();

    //to calculate how many posts to skip after onepage
    const skips = (pageNumber-1)*pageSize;

    //      to fetch posts which have no parents , ie are not comments
    const postsQuery = Echo.find({parentId : {$in: [null,undefined]}})
    .sort({createdAt : 'desc'})
    .skip(skips)
    .limit(pageSize)
    .populate([
        //populating the author
      { path: 'author', model: User },
      //populating the comments, ie ,, children
      { 
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: "_id name parentId image"

        }
      }
    ])

    const totalPostCount = await Echo.countDocuments({parentId : {$in: [null,undefined]}});
    const posts = await postsQuery.exec();

    const isNext = totalPostCount>skips+posts.length;
    return{posts,isNext}

}