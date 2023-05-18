import Hotel from "../models/hotel.js"

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch(err){
        next(err)
    }
}

export const updateHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true} )
        res.status(200).send(`Hotel with id ${req.params.id} is updated in DB`)
    }
    catch(err){
        next(err)
    }
}

export const specificHotel = async (req,res,next)=>{
    try{
        const specificHotel = await findById(req.params.id)
        res.status(200).json(specificHotel)
    }
    catch(err){
        res.status(500).json(err)
    }

}

export const getAllHotels = async (req,res,next) =>{
    
    try{
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels) 
    }
    catch(err){
        next(err)
    }
}

export const deleteHotel = async (req,res)=>{
    try{
        await findByIdAndDelete(req.params.id)
        res.status(200).send(`Hotel id ${req.params.id} deleted from DB`)
    }
    catch(err){
        next(err)
    }}