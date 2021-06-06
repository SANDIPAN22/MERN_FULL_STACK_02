const express=require('express')
const router=express.Router()
const user=require('../model/user')
const {check, validationResult}=require('express-validator')
const bc =require('bcryptjs')

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
            bc.hash(password,10,(e,hp)=>{
                nuser.password=hp

                nuser.save()
                .then((suser)=> {
                    console.log(suser)
                    suser.generateAuth()
                      .then((tok)=>{console.log(`auth token is ${tok}`)
                                    console.log('setting the cookie')
                                    res.cookie('jwtoken',tok,{
                                        httpOnly:true
                                    })
                                    res.status(201).json({message:'SUCCESSFULLY REGISTERED'})
                                    })
                    
                })
                .catch((err)=> res.status(402).json({error:'Unable to store'}))
            })
            
           
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
        {
        const uu = await bc.compare(password,u.password)
        if (uu)
            res.json(uu)
        else
            res.json({error:'WRONG Cred'})
        }
        else{
        res.json({error: "WRONG Cred"})
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