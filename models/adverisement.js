const mongoose = require('mongoose')
const {Schema} = mongoose

const adsSchema = new Schema({
    ads_type:{
        type:String,
        required:true
    },
    interval_ads:{
        type:Number,
        required:false
    },
    ads_url:{
        type:String,
        required:true
    },
    ads_image:{
        type:String,
        required:false
    },
    ads_durations:{
        type:Number,
        required:false
    }
})
module.exports=mongoose.model('Adverisement',adsSchema)