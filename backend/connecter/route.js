const express=require('express')
const router=express.Router()
const jwt = require('jsonwebtoken')
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
                                        maxAge:600000,
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
    check('password','Use Strong Password')
    .exists()
    .isStrongPassword()
],async(req,res)=>{
    const e=validationResult(req)
    if(!e.isEmpty())
    {
        res.status(400).json(e.mapped())
    }
    else{
        const {email,password}=req.body
        const u=await user.findOne({email:email})
        if(u)
        {
        const uu = await bc.compare(password,u.password)
        if (uu)
        {
            u.generateAuth()
            .then((tok)=>{
                console.log(`got this token while doing log in ==>${tok}. Dont worry, it'll be stored as your cookie.` )
                res.cookie('jwtoken',tok,{
                    maxAge:600000,
                    httpOnly:true
                }).status(200).json(tok)
            })
            
        }
        else
            res.status(401).json({error:'WRONG Cred'})
        }
        else{
        res.status(401).json({error: "WRONG Cred"})
        }
    }
})

const tokenValidator= async (req,res,next)=>{
    
    
  try{
        
         token = req.cookies.jwtoken
          const extractedData=jwt.verify(token,'sandipanchakrabortyisbadboyverybadboy')
    console.log(extractedData)
    const rootuser=await user.findOne({_id:extractedData._id})

    req.rootuser=rootuser
  
    next()
  }
  catch(err)
  {console.log("Do a proper login. Token Missing !! \n \n")
      res.status(307).json({error:'Login is not done'})
  }
}

 router.get('/getData', tokenValidator,(req,res)=>{
     console.log(req.rootuser)
    
        res.status(200).json(req.rootuser)
   
 })

// router.get("/login",(req,res)=>{
//     res.send('hello from login page')
// })

// router.get('/signup',(req,res)=>{
//     res.send('hello from signup page')
// })

router.get('/logout',(req,res)=>{
     res.clearCookie('jwtoken')
    res.status(200).send('cookie deleting by backend')
})

module.exports=router;