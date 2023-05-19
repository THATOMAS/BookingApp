import  express  from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router()


//Post
router.post('/:hotelid',verifyAdmin,createRoom)
//Update
router.put('/:id',verifyAdmin,updateRoom )
//Get specefic hotel 
router.get('/:id',getRoom)
//Get all hotels 
router.get('/',getAllRooms)
//Delete 
router.delete('/:id/:hotelid',verifyAdmin,deleteRoom)


export default router

