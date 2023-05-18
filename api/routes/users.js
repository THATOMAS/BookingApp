import  express  from "express";
import { deleteUser, getAllUsers, specificUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()
//chck authentication
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send(`Hello user you are authenticated. `)
// })
// //check user
// router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
//     res.send('Hello user you are logged in and you can delete your account')
// })
// //check admin
// router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
//     res.send('Hello admin you are logged in and you can delete any account')
// })
//Get all users
router.get("/",verifyAdmin,getAllUsers)
//Update user
router.put('/:id',verifyUser,updateUser )
//Get specefic user 
router.get('/:id',specificUser)
//Delete user
router.delete('/:id',verifyUser,verifyAdmin,deleteUser)

export default router

