import express from 'express'

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT=8080
app.get('/',(req,res)=>{
    res.status(200).send('Hello World!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
