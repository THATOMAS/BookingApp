import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import authRoute from './routes/auth.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'

dotenv.config()
const app = express()

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('connected to db')
    }
    catch(error){
        throw error
    }
}

mongoose.connection.on('disconnected',()=>{
    console.log('DB disconnected')
})

mongoose.connection.on('connected',()=>{
    console.log('DB connected')
})
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)


app.use((err,req,res,next)=>{
    
    
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'something went wrong'
    
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
        
    })
})

app.listen(8800,()=>{
    connect()
    console.log('Connected to backend')
})