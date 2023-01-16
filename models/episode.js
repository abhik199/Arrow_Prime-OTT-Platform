const mongoose = require('mongoose')
const episodeSchema = new mongoose.Schema({
    season:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'season',
        required:false
    },
    episode_name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:false
    },
    url_type:{
        type:String,
        required:true
    },
    base_url:{
        type:String,
        required:true
    },
    unlock_content:{
        type:String,
        required:true
    },
    Manage_Price:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manage_Price',
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
    }
})
module.exports=mongoose.model('Episodes',episodeSchema)