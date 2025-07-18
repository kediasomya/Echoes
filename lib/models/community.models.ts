import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    id: { type:String ,required:true},
    username: { type:String ,required:true ,unique:true},
    name :{type:String, required:true},
    image:{ type:String  },
    bio:String,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    echoes:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'Echo'
        }
    ],
    members:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
});

const Community = mongoose.models.Community ||  mongoose.model('Community' , communitySchema);
export default Community;

