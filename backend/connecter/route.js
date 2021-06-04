const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('homepage')
})

router.get('/about',(req,res)=>{
    res.send('about me')
})

router.get('/contact',(req,res)=>{
    res.send('contact me !')
})

router.get("/login",(req,res)=>{
    res.send('hello from login page')
})

router.get('/signup',(req,res)=>{
    res.send('hello from signup page')
})

module.exports=router;