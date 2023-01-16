const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false,
        default: ''
    },
    age: {
        type: String,
        required: false,
        default: ''
    },
    gender: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false,
        default: ''
    },
    state:{
        type: String,
        required: false,
        default: ''

    },
    role: {
        type: String,
        required: true,
        default:'user'
    },
   
    insertedDateTime:{
        type: String,
        required: false,
        default: new Date()
    },
    modifiedDateTime:{
        type: String,
        required: false,
        default: ''
    }
})



module.exports = mongoose.model('User',userSchema,'users');