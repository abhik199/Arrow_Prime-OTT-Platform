const mongoose = require('mongoose')
const Price = new mongoose.Schema({
    price:{
        type:Number,
        required:true
    },
    product_key:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Manage_Price',Price)