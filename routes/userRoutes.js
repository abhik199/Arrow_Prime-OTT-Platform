const express = require('express');


const user_routes = express.Router()

// folder require in userControllers
const { userLogin } = require('../Controllers/userControllers/login');
const { userdelete, userlogout } = require('../Controllers/userControllers/logout');

const { userRegistration } = require('../Controllers/userControllers/registration');

const { userUpdate } = require('../Controllers/userControllers/update');

const userVideo = require('../Controllers/Video')
const auth = require('../middleware/userauth')
// user api 
user_routes.post('/registration',userRegistration)
user_routes.post('/login',userLogin)
user_routes.delete('/delete/:id',auth,userdelete)
user_routes.delete('/logout',auth,userlogout)
user_routes.put('/update/:id',auth,userUpdate)

// video category and managevideo apis
user_routes.get('/videocategory',userVideo.videocategor)
user_routes.get('/managevideos',userVideo.userVideo)

// tv categort And tv channels
user_routes.get('/tvcategory')
user_routes.get('/tvchannel')


// user_routes.delete('/delete/:id'auth,)

module.exports=user_routes
