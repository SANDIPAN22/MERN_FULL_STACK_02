const express= require('express')
const dotenv= require('dotenv')
const app=express()

const routes= require('./connecter/route')
const mongoose=require('mongoose')

dotenv.config({path: './config.env'})
const mongoURI=process.env.DATABASE
const PORT= process.env.PORT

mongoose.connect(mongoURI)
    .then(()=> console.log("MONGOdb Connected.."))
    .catch((err)=> console.log(err))
app.use(express.json())




app.use('/',routes)




app.listen(PORT, ()=>console.log('server is up!'))