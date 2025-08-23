import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js'
import Router from './routes/userRouter.js'
const app=express()
//mongo
connectDb()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
const PORT=process.env.PORT
app.get('/',(req,res)=>{
    res.status(200).send('Hello World!')
})
app.use('/api/v1/user',Router)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
