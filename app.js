
// require('dotenv').config()
// const PORT = process.env.APP_PORT
require("dotenv").config();
const express = require('express')
const app = express()
const Partials = require('partials')
app.use(express.json())
const path = require('path')
// mongodb+srv://abhishek:abhi@cluster0.fv7kp8a.mongodb.net/Arrow_Prime_OOT?retryWrites=true&w=majority
const ejs = require('ejs')

const cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/Arrow')
.then((r)=>{
    console.log("Db connected");
})
.catch((e)=>{
    console.log("db Connection error");
})





// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());



// all routes folder 
const admin = require('./routes/adminRoutes')
const user = require('./routes/userRoutes');
const web_routes = require("./Controllers/Web_Series");
app.use('/',web_routes)
app.use('/',admin)
app.use('/api',user)

// for the partialse

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ejs.registerPartials(path.join(__dirname, 'views/partials'));

// app.listen(PORT,()=>{console.log(url+PORT);})

module.exports=app