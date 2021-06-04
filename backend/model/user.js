const mongoose= require('mongoose')
const bc=require('bcryptjs')
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


// userSchema.pre('save',async function(next){

//     if(this.isModified('password'))
//     {
//         this.password=bc.hash(this.password,12)
//     }
//     next()
// })


module.exports=mongoose.model("registration",userSchema)