import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    id: { type:String ,required:true},
    username: { type:String ,required:true ,unique:true},
    name :{type:String, required:true},
    image:{ type:String  },
    bio:String,
    echoes:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'Echo'
        }
    ],
    onboarded:
    {
        type:Boolean , default:false
    },
    communities:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
});

const User = mongoose.models.User ||  mongoose.model('User' , userschema);
export default User;

