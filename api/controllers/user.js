import Hotel from "../models/user.js"

export const getAllUsers = async (req,res,next)=>{
    try{
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels)
    }
    catch(err){
        next(err)
    }
}