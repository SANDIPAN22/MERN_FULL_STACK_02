const express=require('express')
const router=express.Router()
const user=require('../model/user')


router.get('/',(req,res)=>{
    res.send('homepage')
})

router.post('/signup',midi1,(req,res)=>{
    const  {name, email , password, phone }= req.body
    user.findOne({email:email})
    .then((yes)=>{
        if(yes)
        res.status(400).json({error: 'USER is already registered.'})
        else{
            const nuser= new user({
                name:name,
                email:email,
                password:password,
                phone:phone

            })
            nuser.save()
            .then(()=> res.status(201).json({message:'SUCCESSFULLY REGISTERED'}))
            .catch((err)=> res.status(402).json({error:'Unable to store'}))
        }
    })
   
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const u=await user.findOne({email:email})
    if(u)
    res.json(u)
    res.json({error: "Wrong Cred"})
})

function midi1(req,res,next){
    const  {name, email , password, phone}= req.body
     if (!name || !email  || !password || !phone)
     {
         res.status(422).json({error:'wrong format submitted!'})
     }
     else{
         next();
        
     }
 }
// router.get('/contact',(req,res)=>{
//     res.send('contact me !')
// })

// router.get("/login",(req,res)=>{
//     res.send('hello from login page')
// })

// router.get('/signup',(req,res)=>{
//     res.send('hello from signup page')
// })

module.exports=router;