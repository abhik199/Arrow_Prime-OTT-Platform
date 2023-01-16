const mongoose = require('mongoose')
const {Schema} = mongoose
const seriesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    actor:{
        type:String,
        required:false
    },
    writer:{
        type:String,
        required:false
    },
    director:{
        type:String,
        required:false
    },
    release_date:{
        type:String,
        required:false
    },
    thumbnail_image:{
        type:String,
        required:false
    },
    poster:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    series_cat_id: {
        type: String,
        required:true
    },
    season:[{
        type:Schema.Types.ObjectId ,
        ref:"season"
       
    }]
   

})
module.exports=mongoose.model('Seriesh',seriesSchema)