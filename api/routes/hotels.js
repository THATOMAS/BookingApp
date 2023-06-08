import  express  from "express";
import Hotel from "../models/hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, specificHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

//Post
router.post('/',verifyAdmin,createHotel)
//Update
router.put('/update/:id',verifyAdmin,updateHotel )
//Get specefic hotel 
router.get('/find/:id',specificHotel)
//Get all hotels 
router.get('/',getAllHotels)
router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
//Delete 
router.delete('/:id',verifyAdmin,deleteHotel)

export default router
