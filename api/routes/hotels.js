import  express  from "express";
import Hotel from "../models/hotel.js";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getAllHotels, specificHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

//Post
router.post('/',verifyAdmin,createHotel)
//Update
router.put('/:id',verifyAdmin,updateHotel )
//Get specefic hotel 
router.get('/:id',specificHotel)
//Get all hotels 
router.get('/',getAllHotels)
//Delete 
router.delete('/:id',verifyAdmin,deleteHotel)

export default router

