const mongoose = require('mongoose')
const Tvcat = new mongoose.Schema({
    category_name:{type:String,required:true},
    image_category:{type:String}
})
module.exports=mongoose.model('tv_categories',Tvcat,'Tv_categories') 