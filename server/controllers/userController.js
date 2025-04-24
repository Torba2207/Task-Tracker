import User from "../models/User.js";


export const getCurrentUserData=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password')
        if(!user)
            return res.status(404).json({message:"No such user"})
        res.status(200).json({
            id:user._id,
            username:user.username,
            email:user.email
        })
    }catch(err){
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error fetching user:',err });
    }
}