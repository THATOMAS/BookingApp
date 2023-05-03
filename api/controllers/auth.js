import User from "../models/user.js"
import bcrypt from 'bcryptjs';
import {createError} from "../utils/error.js"


export const register = async (req,res,next)=>{
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);      
 
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            isAdmin:req.body.isAdmin})
        
        await newUser.save()
        res.status(200).send(`User ${newUser.username} has been created .`)
    }
    catch(err){
        next(err)
    }
} 

export const login = async (req,res,next)=>{
    
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){return next(createError(401,"User not found"))}
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,'Wrong password or username'))
    
    }
    catch(err){
        next(err)
    }
} 