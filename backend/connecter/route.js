const express=require('express')
const router=express.Router()
const user=require('../model/user')
const {check, validationResult}=require('express-validator')

router.get('/',(req,res)=>{
    res.send('homepage')
})

router.post('/signup',[
    check('name','Enter name (Minimum length 4)')
    .exists()
    .isLength({min: 4})
    .trim(),

    check('email','Write proper Email')
    .exists()
    .isEmail()
    .normalizeEmail(),

    check('password','Use Strong Password')
    .exists()
    .isStrongPassword(),

    check('phone').custom((val,{req})=>{
        
        if (val.toString().length==10)
        {
            
        return true

        }
        throw new Error ('PHONE number must be of 10 digits!')
    })

],(req,res)=>{
    const e=validationResult(req)
    if(!e.isEmpty())
    {
        res.json({error:e})
    }
    else{
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

   }
   
})

router.post('/login',[
    check('email','Write Proper Email')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('password','Use String Password')
    .exists()
    .isStrongPassword()
],async(req,res)=>{
    const e=validationResult(req)
    if(!e.isEmpty())
    {
        res.json(e.mapped())
    }
    else{
        const {email,password}=req.body
        const u=await user.findOne({email:email})
        if(u)
        res.json(u)
        else{
        res.json({error: "Wrong Cred"})
        }
    }
})


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