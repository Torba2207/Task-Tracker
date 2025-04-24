import Task from "../models/Task.js";


export const addTask=async(req,res)=>{
    const {title, description, dueDate}=req.body
    try{
        const newTask=new Task({
            title,
            description,
            dueDate,
            user: req.user.id
        })
        await newTask.save()
        res.status(201).json({message:"Task successfuly created"})

    }catch(err){
        console.error("Error during task creation:",err)
        res.status(500).json({message:"Error during task creation:",err})
    }
}


export const updateTask=async(req,res)=>{
    const {taskId}=req.params
    const {title,description,dueDate,status}=req.body
    try{
        const task=await Task.findOne({_id:taskId,user:req.user.id})
        if(!task)
            return res.status(404).json({message:"Couldn't find such task"})
        task.title=title||task.title
        task.description=description||task.description
        task.dueDate=dueDate||task.dueDate
        task.status=status||task.status

        await task.save()
        res.status(201).json(task)

    }catch(err){
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Server error updating task', err });
    }
}


export const getTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({user:req.user.id})
        res.status(202).json(tasks)
    }catch(err){
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server error during fetching tasks', err });
    }
}


export const deleteTask=async(req,res)=>{
    const {taskId}=req.params

    try{
        const task=await Task.findOneAndDelete({_id:taskId, user:req.user.id})
        if(!task)
            return res.status(404).json({message:"Couldn't find such task"})
        res.status(203).json({message:"Task has been successfully deleted"})
    }catch(err){
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Server error during deleting task', err });
    }
}