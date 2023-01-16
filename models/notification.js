const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true

    },
    url:{
        type:String,
        required:false
    }

})
module.exports=mongoose.model('notification',notificationSchema)