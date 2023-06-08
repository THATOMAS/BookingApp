import User from "../models/user.js"
import { createError } from "../utils/error.js"

import pkg from 'mongoose';


export const getAllUsers = async (req,res,next)=>{
    try{
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    }
    catch(err){
        return next(createError(err.status,err.message))
    }
}


export const updateUser = async (req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true} )
        res.status(200).send(`Hotel with id ${req.params.id} is updated in DB`)
    }
    catch(err){
        return next(createError(err.status,err.message))
    }
}

export const specificUser = async (req,res,next)=>{
    try{
        const specificUser = await User.findById(req.params.id)
        res.status(200).json(specificUser)
    }
    catch(err){
        return next(createError(err.status,err.message))
    }

}


export const deleteUser = async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send(`Hotel id ${req.params.id} deleted from DB`)
    }
    catch(err){
      return  createError(err.status,err.message)
    }}