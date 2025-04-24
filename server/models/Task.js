import mongoose from "mongoose";
import User from "./User.js";

const taskSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true,
    },
    dueDate:{
        type: Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'in-progress','completed'],
        default:'pending'
    }

},{
    timestamps:true
})


const Task=mongoose.model('Task',taskSchema);
export default Task;