import  express  from "express";
import Hotel from "../models/hotel.js";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getAllHotels, specificHotel, updateHotel } from "../controllers/hotel.js";

const router = express.Router()

//Post
router.post('/',createHotel)
//Update
router.put('/:id',updateHotel )
//Get specefic hotel 
router.get('/:id',specificHotel)
//Get all hotels 
router.get('/',getAllHotels)
//Delete 
router.delete('/:id',deleteHotel)

export default router

