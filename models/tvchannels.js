const tv_categories = require('./tv_categories')
const mongoose = require('mongoose')

const tvchannels = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    video_cat_id: {
        type: String,
        required:true
    },
    url_type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    video_image:{
        type: String,
        required: false
    },
    banner_image:{
        type: String,
        required: false
    },
    content:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    },
    // addedBy: {
    //     type: mongoose.ObjectId,
    //     required: true,
    //     default: 'Active'
    // },
    insertedDateTime: {
        type: String,
        required: false,
    },
    modifiedDateTime: {
        type: String,
        required: false,
        default: ''
    },
    Manage_Price:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manage_Price',
        required:false
    }
})

module.exports=mongoose.model('Tv_Channel',tvchannels,'Tv_Channel')