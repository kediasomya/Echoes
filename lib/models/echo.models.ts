import mongoose from "mongoose";
import { date } from "zod";

const echoSchema = new mongoose.Schema({
    text: { type:String ,required:true},
    
    author:
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        }
    ,
    community:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    },
    parentId:{
        //in case it is a comment
        type:String
    },
    children:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Echo'
        //reference to itself as thread can have children as thread
        //recursion , comment on comment is also thread
    }
    ]
});

const Echo = mongoose.models.Echo ||  mongoose.model('Echo' , echoSchema);
export default Echo;

