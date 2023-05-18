import User from "../models/user.js"

export const getAllUsers = async (req,res,next)=>{
    try{
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    }
    catch(err){
        next(err)
    }
}


export const updateUser = async (req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true} )
        res.status(200).send(`Hotel with id ${req.params.id} is updated in DB`)
    }
    catch(err){
        next(err)
    }
}

export const specificUser = async (req,res,next)=>{
    try{
        const specificUser = await findById(req.params.id)
        res.status(200).json(specificUser)
    }
    catch(err){
        res.status(500).json(err)
    }

}


export const deleteUser = async (req,res)=>{
    try{
        await findByIdAndDelete(req.params.id)
        res.status(200).send(`Hotel id ${req.params.id} deleted from DB`)
    }
    catch(err){
        next(err)
    }}