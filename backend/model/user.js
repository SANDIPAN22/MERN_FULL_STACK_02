const mongoose= require('mongoose')

const jwt= require('jsonwebtoken')

const userSchema= new mongoose.Schema({


    name:
    {
        type: String,
        required: true
    },

    email:
    {
        type: String,
        required: true
    },

    password:
    {
        type: String,
        required: true
    },
     
    phone:
    {
        type: Number,
        required: true
    },

    date:
    {
        type: Date,
        default: Date.now()     
    }

  
    
    

})

userSchema.methods.generateAuth=async function()
{
    console.log('Creating the auth token ..... ')
    
   const tok= await jwt.sign({_id:this._id},'sandipanchakrabortyisbadboyverybadboy')
   
  
   

  return tok
    
} 
// userSchema.pre('save',async function(next){

//     if(this.isModified('password'))
//     {
//         this.password=bc.hash(this.password,12)
//     }
//     next()
// })


module.exports=mongoose.model("registration",userSchema)