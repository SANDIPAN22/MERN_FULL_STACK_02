const express= require('express')
const dotenv= require('dotenv')
const cors=require('cors')
const cp=require('cookie-parser')

const app=express()

app.use(express.json())
app.use(cp())

const routes= require('./connecter/route')
const mongoose=require('mongoose')

dotenv.config({path: './config.env'})
const mongoURI=process.env.DATABASE
const PORT= process.env.PORT

mongoose.connect(mongoURI)
    .then(()=> console.log("MONGOdb Connected.."))
    .catch((err)=> console.log(err))





app.use('/',routes)




app.listen(PORT, ()=>console.log('server is up!'))