const mongoose = require('mongoose')
const feedback = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:false
    }

})
module.exports=mongoose.model('feedback',feedback)