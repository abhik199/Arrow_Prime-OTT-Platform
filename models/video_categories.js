const mongoose = require('mongoose');

const videoCateSchema = new mongoose.Schema({
      category_name:{type:String,required:true},
      image_category:{type:String,required:false}
})

module.exports = mongoose.model('videoCatModel',videoCateSchema, 'video_categories');