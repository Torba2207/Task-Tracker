import User from "../models/User";


export const register = async (req, res) => {
    const {userName,email,password}=req.body
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
