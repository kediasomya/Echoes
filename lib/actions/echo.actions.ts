"use server";

import { revalidatePath } from "next/cache";
import Echo from "../models/echo.models";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";
import { currentUser } from "@clerk/nextjs/server";
import Community from "../models/community.models";
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

          const communityIdObject = await Community.findOne(
            { id: communityId },
            { _id: 1 }
          );
            //Echo is a mongodb model ,just like User was
            //in echo.models.ts
         const user = await User.findOne({ id: author }); // 'id' is Clerk user id
         if (!user) throw new Error("User not found");

        console.log("LOOKUP Community for id:", communityId, "=>", communityIdObject);

        const createdEcho = await Echo.create({
            text,
           // author, 
           author: user._id,
            // // Use MongoDB ObjectId
            community: communityIdObject ? communityIdObject._id : null, // Store only the ObjectId
        });

        await User.findByIdAndUpdate(
            user._id,{
                $push:{echoes:createdEcho._id}
            }
        )

            if (communityIdObject) {
            // Update Community model
            await Community.findByIdAndUpdate(communityIdObject, {
              $push: { echoes: createdEcho._id },
            });
    }

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
  .populate(
        //populating the author
      { path: 'author', 
        model: User 
      })
      //populating the comments, ie ,, children
      .populate({
        path: 'community',
        model: Community,
        
      })
      .populate({
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: "_id name parentId image"

        }
      }
    )

    const totalPostCount = await Echo.countDocuments({parentId : {$in: [null,undefined]}});
    const posts = await postsQuery.exec();

    const isNext = totalPostCount>skips+posts.length;
    return{posts,isNext}

}

export async function fetchEchoById(id:string){
    connectToDb();
    try{
        //todo :populate community
        const echo = await Echo.findById(id) 
         .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username


      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
     }) 
      // Populate the community field with _id and name


         .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Echo, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();
      return echo;
    }
    catch(error:any )
    {
            throw new Error(`error feching echo: ${error.message}`)
    }
}

export async function addComment(
  echoId:string,
  commentText:string,
  userId:string,
  path:string,
){
  connectToDb();

  try{
      const originalEcho = await Echo.findById(echoId)
      if(!originalEcho)
        throw new Error("echo not found")
      const user = await currentUser();

      //creating new thread with comment
      const commentEcho = new Echo({
        text:commentText,
        author:userId,
        parentId :echoId ,

      })

      //save the new thread , we have to use .save when using new Echo , initialy when model was directly used Echo.create , 
      //save is alredy called apne aap

      const savedComment = await commentEcho.save();
      //update the new thread with the comment

      originalEcho.children.push(savedComment._id);
      //save the original thread
      await originalEcho.save();
      revalidatePath(path);

  }catch(error:any)
  {
     throw new Error(`error reverbing: ${error.message}`)
  }
  
}

export async function fetchUserPosts(userId:string){
  connectToDb();
  try{

    //todo populate community
    const echoes = await User.findOne({id:userId})
    .populate({
      path:'echoes',
      model:'Echo',
      populate:[
      {
        path:'community',
        model:'Community',
        select:'_id id name image',
      },
        {
          path:'children',
          model:'Echo',
          populate:{
            path:'author',
            model:'User',
          select:'name image id'
        }
      }
    ],
    })
    return echoes;
    

  }catch(error:any)
  {
    throw new Error(`error fething user/community posts: ${error.message}`)
  }
  }


async function fetchAllChildEchoes(echoId: string): Promise<any[]> {
  const childEchoes = await Echo.find({ parentId: echoId });

  const descendantEchoes = [];
  for (const childEcho of childEchoes) {
    const descendants = await fetchAllChildEchoes(childEcho._id);
    descendantEchoes.push(childEcho, ...descendants);
  }

  return descendantEchoes;
}


