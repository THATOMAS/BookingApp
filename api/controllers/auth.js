import User from "../models/user.js"
import bcrypt from 'bcryptjs';
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"

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
        if(!user)return next(createError(401,"Invalid user"))

        const isPasswordCorrect = await bcrypt.compareSync(req.body.password,user.password); 
        if(!isPasswordCorrect)return next(createError(403,"Invalid password"));
        
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        
        const {password,isAdmin,...otherDetails} =user._doc;
        res.cookie("access",token,{httpOnly:true}).status(200).json({...otherDetails})
    
    }
    
    catch(err){
        next(err)
    }

    }