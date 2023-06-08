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
        const specificHotel = await Hotel.findById(req.params.id)
        res.status(200).json(specificHotel)
    }
    catch(err){
        next(err)
    }

}

export const getAllHotels = async (req,res,next) =>{
   const {limit,min,max,...others} = req.query
    const queryLimit = parseInt(limit)
    try{
        const allHotels = await Hotel.find({...others,cheapestPrice:{$gt:min || 100 ,$lt:max || 1000}}).limit(queryLimit)
        res.status(200).json(allHotels) 
    }
    catch(err){
        next(err)
    }
}


export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send(`Hotel id ${req.params.id} deleted from DB`)
    }
    catch(err){
        next(err)
    }}

 
export const countByCity = async (req,res,next) =>{
    const cities = req.query.cities.split(",")

    try{
        const list = await Promise.all(cities.map((city)=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
    
}

export const countByType = async (req,res,next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})

        
    res.status(200).json([
        {type:"hotels",count:hotelCount},
        {type:"apartments",count:apartmentCount},
        {type:"resorts",count:resortCount},
        {type:"villas",count:villaCount},
        {type:"cabins",count:cabinCount}
    ])
    }
    catch(err){
        next(err)
    }

} 