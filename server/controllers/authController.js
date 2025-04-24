import User from "../models/User";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const {username,email,password}=req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'User with this email already exists'})
        }
        const newUser=new User({
            username,
            email,
            password
        })

        await newUser.save();
        res.status(201).json({message:"User successfuly created!"});
    }
    catch(err){
        console.error("Error during registration process:",err)
        res.status(500).json({message:"Server Error:", err})
    }

}


export const login=async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user)
            return res.status(400).json({message:"No such user"});

        const isMatch=user.comparePassword(password)
        if(!isMatch)
            return res.status(400).json({message:"Wrong Password"});

        const token=jwt.sign(
            {id:user._id,username:user.username,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.status(300).json({token})
    }
    catch(err){
        console.error('Error during login:', err)
        res.status(500).json({message:"Error server:",err})
    }
}
