const express = require('express')
const path = require('path')
const { verifylogin, adminlogin, adminlogout, forgot } = require('../Controllers/adminControllers/adminLogin')
require('dotenv').config()

const admin_router = express.Router()
const videoModels = require('../models/videos')
const dashboard = require('../Controllers/adminControllers/dashboard')
const tvcategories = require('../models/tv_categories')
const tvchannels = require('../models/tvchannels')
const videoCat = require('../models/video_categories')



// const auth = require('../middleware/auth')
//admin get method
const Auth = require('../middleware/auth')



// Dashboard apis


admin_router.get('/dashboard', Auth,dashboard.Dashbord)

admin_router.get('/user', Auth, dashboard.user)

admin_router.get('/create_video', Auth, dashboard.createVideo)

admin_router.get('/manage_video', Auth, dashboard.manageVideo)

admin_router.get('/video_category', Auth, dashboard.videoCat)

admin_router.get('/tv_category', Auth, dashboard.tvcat)

admin_router.get('/tv_channels', Auth, dashboard.tvchal)

admin_router.get('/add_category', Auth, dashboard.addcat)

// admin_router.get('/views',dashboard.userViews)

admin_router.get('/', adminlogin)

admin_router.post('/', verifylogin)

admin_router.get('/forgot_password', forgot)

admin_router.get('/logOut', Auth, adminlogout)

admin_router.get('/tv_Channel', Auth, dashboard.createVideo1)

admin_router.post('', Auth, dashboard.videoCat)

admin_router.get('/tv_channels/edit/:id', dashboard.editchannel)



admin_router.post('/add_category', Auth, dashboard.posttvcat)

// admin_router.post('/add_tvcategory',)

admin_router.get('/tvupdate/:id', Auth, dashboard.tvcatupdate)
// ,dashboard.tvcatupdate1

// add video category reder
admin_router.get('/Add_video_category', Auth, dashboard.addvideocat)


// Price secation
admin_router.get('/price', Auth, dashboard.show_price)

admin_router.get('/add_price', Auth, dashboard.add_price)

admin_router.post('/add_price', Auth, dashboard.addprice)

admin_router.get('/price/edit/:id', Auth, dashboard.editviews)

admin_router.post('/edit_price/:id', Auth, dashboard.edit_price)

admin_router.get('/price/delete/:id', Auth, dashboard.delete_price)

// notification send

admin_router.post('/send_notification', Auth, dashboard.sendNoti)

// send Notificattio user
// get request user side
admin_router.get('/notifications', dashboard.sendnotification)




// Feedback form user side
admin_router.post('/feedback', dashboard.feedbackform)

// Contact Us form 

admin_router.post('/contact_us', dashboard.contactus)

// Manage Price Get request 

admin_router.get('/manage_price', dashboard.managePrice)

// tv category get apis
// get request 
admin_router.get('/tv_categorie', dashboard.tvcategorie)

// tv channels get apis
admin_router.get('/tvchannel', dashboard.tvChannel)


// edit render request 
admin_router.get('/edit/:id',dashboard.editVideo)

// edit video cat
admin_router.get('/edit_videocat/:id',dashboard.rendereditvideocat)


admin_router.get('/ads',dashboard.sendads)


// advertisemrnt api
admin_router.get('/advertisement',dashboard.rederAdd)

// render add page 
admin_router.get('/send_ads',dashboard.rederEdit)




const lmage_url  = process.env.image_url



const auth = require('../middleware/auth')
const video_categories = require('../models/video_categories')
const users = require('../models/users')
const feedback = require('../models/feedback')
const contact_us = require('../models/contact_us')
const adverisement = require('../models/adverisement')

const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/userImages'))
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
  }
});

const upload = multer({ storage: storage });








// Create new video 
var uploadimage = upload.fields([{ name: 'video_image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }])
admin_router.post('/create_video', uploadimage,async function (req, res, next) {
const obj = Object.assign({},req.files)


try {
  const { title,video_cat_id, url_type,url,content, Manage_Price,description} = req.body
  const post = new videoModels({
    title,
    video_cat_id,
    url,
    url_type,
    content,Manage_Price,
    description
  })
  if(obj.video_image && obj.banner_image){
      const video_image =  process.env.image_url+req.files.video_image[0].filename
      const banner_image = process.env.image_url +req.files.banner_image[0].filename
      post.video_image = video_image
      post.banner_image=banner_image
    }
    else if(obj.video_image){
      const video_image =  process.env.image_url+req.files.video_image[0].filename
      post.video_image = video_image
    }
    else if(obj.banner_image){
      const banner_image = process.env.image_url +req.files.banner_image[0].filename
      post.banner_image=banner_image
    }
    const data = await post.save()    
    res.redirect('/manage_video')
}
  
catch(err){
  console.log(err);
  return res.status(500).json({message:'Internal Servar error'})

}
})
  

  
 
  

  
 

// tV categories Image and Category Name update
admin_router.post('/edit/tvchannel/:id',  upload.fields([{ name: 'video_image'}, { name: 'banner_image' }]), async (req, res) => {
   
  const { id } = req.params
 
  
  try {
    const {title,video_cat_id,url,url_type,content,description,Manage_Price,insertedDateTime} = req.body
    const updates = {
      title,
      video_cat_id,
      url,
      url_type,
      content,
      description,
      Manage_Price,
      insertedDateTime
    }
    const obj = Object.assign({},req.files)
    if(obj.banner_image && obj.video_image){
      const banner_image =  process.env.image_url+req.files.banner_image[0].filename
      const video_image = process.env.image_url+req.files.video_image[0].filename
      updates.banner_image = banner_image
      updates.video_image = video_image
    }
    else if (obj.banner_image){
      const banner_image =  process.env.image_url+req.files.banner_image[0].filename
      updates.banner_image = banner_image
    }
    else if(obj.video_image){
      const video_image = process.env.image_url+req.files.video_image[0].filename
      updates.video_image = video_image

    }
    const finalMatch = await tvchannels.findByIdAndUpdate({_id:id},{$set:updates})
     
    res.redirect('/tv_channels')
   
    
  } catch (error) {
    console.log(error);
    return res.send("Internal servar Error")
  }
  
 // Edit video Categorety
 
admin_router.post('/edit_videocategory/:id',upload.single('image_category'),async(req,res)=>{
  console.log(req.body);
  try {
    const {id} = req.param
    const category_name = req.body.category_name
    const updates = {
      category_name,
    }
    if(req.file){
      const image_category = req.file.filename
      updates.image_category = image_category
    }
    const data =  await video_categories.findByIdAndUpdate({_id:id},{$set:updates})
    return res.redirect('/video_category')    

    
  } catch (error) {
    return res.status(500).json({message:"Internal Servar error"})
    
  }
})
    
    
   
  


  
})
admin_router.post('/add_tvcategory', upload.single('image_category'), async (req, res, next) => {
 
  try {
    const {category_name} = req.body
    const post = new tvcategories ({
      category_name,
    })
    if (req.file) {
      const image_category =  process.env.image_url+req.file.filename
      post.image_category = image_category
    }
    const a1 = await post.save()
    res.redirect('/tv_category')
  } catch (error) {
    // console.log(error);
    return res.send('Internal Servar Problem')
  }
})


// Edit tv category 

admin_router.post('/edit_tvcategory/:id', upload.single('image_category'), async (req, res, next) => {
  const { id } = req.params
  try {
    const category_name = req.body.category_name;
    const updates = {
      category_name,
    }
    if (req.file) {
     
      const image_category  = process.env.image_url+req.file.filename;
      updates.image_category = image_category
     
    }
    const a = await tvcategories.findByIdAndUpdate({ _id: id }, { $set:updates})
    res.redirect('/tv_category')
  } catch (error) {
    return res.send('Internal Servar Problem')
  }
})


// add video category 
admin_router.post('/add_videochal', upload.single('image_category'), async (req, res, next) => {
  try {
    const category_name = req.body.category_name
    const post = new videoCat({
      category_name,
    })
    if (req.file) {
     const image_category = process.env.image_url+req.file.filename
     post.image_category = image_category
    }
    const a = await post.save()
    res.redirect('/video_category')
  } catch (error) {
    return res.send('Internal Servar Problem')
  }
})



// Post request for Tv Channels

// admin_router.post('/create_tvchannel', upload.fields([{ name: 'video_image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }]), async function(req,res,next) 





// Create Tv new tv Channels
admin_router.post('/create_tvchannel', upload.fields([{ name: 'video_image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }]), async function (req, res, next) {

  try {
    
    const obj = Object.assign({},req.files)
    const { title,video_cat_id,url_type,url, content, Manage_Price ,description, insertedDateTime} = req.body
    const post = new tvchannels({
      title,
      video_cat_id,
      url,
      url_type,
      content,
      Manage_Price,
      description,
      insertedDateTime
    })
    if (obj.video_image && obj.banner_image ) {
     const video_image = lmage_url+req.files.video_image[0].filename;
     const banner_image = lmage_url+req.files.banner_image[0].filename;
     post.video_image=video_image,
     post.banner_image=banner_image
    }
    else if (obj.video_image){
      const video_image = lmage_url+req.files.video_image[0].filename;
      post.video_image=video_image
    }
    else if(obj.banner_image){
      const banner_image = lmage_url+req.files.banner_image[0].filename;
      post.banner_image=banner_image
    }
    const data = await post.save()
    return res.redirect('/tv_Channel')
  } catch (error) {
    console.log(error);
    return res.json({ error: 'Internal servar error' })
  }
});

admin_router.post('/edit_videos/:id', upload.fields([{ name: 'video_image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }]), async function (req, res, next){
const { id } = req.params
try {
  const {title,video_cat_id,url_type,url,content,Manage_Price,description,insertedDateTime} = req.body
  const obj = Object.assign({},req.files)
  const updates = {
    title,
    video_cat_id,
    url_type,
    url,
    content,
    Manage_Price,
    description,
    insertedDateTime
  }
  if(obj.video_image && obj.banner_image){
    const banner_image = process.env.image_url+req.files.banner_image[0].filename;
    const video_image =  process.env.image_url+req.files.video_image[0].filename;
    updates.banner_image=banner_image
    updates.video_image=video_image
  }
  else if(obj.video_image){
    const video_image =  process.env.image_url+req.files.video_image[0].filename;
    updates.video_image=video_image
    
  }
  else if(obj.banner_image){
    const banner_image = process.env.image_url+req.files.banner_image[0].filename;
    updates.banner_image=banner_image
   
  }
  const data = await videoModels.findByIdAndUpdate({_id:id},{$set:updates})
  res.redirect('/manage_video')
} catch (error) {
  console.log(error);
  return res.json({msg:'something went wrong'})
}
});

// Adverisement Ads

admin_router.post('/send_ads',upload.single('ads_image'),async(req,res)=>{
  try {
    const { ads_type,interval_ads,ads_url, ads_durations} = req.body
    const post = new adverisement ({
      ads_type,
      interval_ads,
      ads_url,
      ads_durations
    })
    if(req.file){
      const ads_image = process.env.image_url+req.file.filename;
      post.ads_image=ads_image
    }
    const a = await post.save()
      if(!a){
        return res.json({success:false,message:'Data is Not Insert'})
      }
      return res.redirect('/advertisement')

} catch (error) {
  return res.redirect('/advertisement')
    
  }
})

// delete request for ads
admin_router.get('/ads/delete/:id',async(req,res)=>{
  const {id} = req.params
  await adverisement.deleteOne({_id:id})
  return res.redirect('/advertisement')
}) 

// admin_router.post('/send_ads',dashboard.rederEdit)

// get apis for send data client side
admin_router.get('  ',async(req,res)=>{
  try {
    const data = await adverisement.find()
    if(!data){
      return res.status(400).json({success:false,message:'Data not Found'})
    }
    return res.status(200).json({success:true,data:data})
    
  } catch (error) {
    return res.status(500).json({success:false,message:'Internal Server error'})
    
  }
})



// delete video category 
admin_router.get('/video_category/delete/:id', async (req, res) => {
  const { id } = req.params
  const a = await video_categories.deleteOne({ _id: id })
  res.redirect('/video_category')

})
admin_router.get('/manage_video/delete/:id', async (req, res) => {
  const { id } = req.params
  const b = await videoModels.deleteOne({ _id: id })
  res.redirect('/manage_video')
})
// User delete Information byi admin
admin_router.get('/user/delete/:id', async (req, res) => {
  const { id } = req.params
  const x = await users.deleteOne({ _id: id })
  res.redirect('/user')
})
// tv categorey Delete
admin_router.get('/tv_category/delete/:id', async (req, res) => {
  const { id } = req.params
  const data = await tvcategories.deleteOne({ _id: id })
  res.redirect('/tv_category')
})

// tv channel Delete
admin_router.get('/tv_channels/delete/:id', async (req, res) => {
  const { id } = req.params
  const data = await tvchannels.deleteOne({ _id: id })
  res.redirect('/tv_channels')
})










//  create tv channel image is not required 


// update tv channels 


// contact us page
admin_router.get('/contact', async (req, res) => {
  const a = await contact_us.find()
  res.render('contact_us',{a})
})
// contact us delete form

admin_router.get('/conact_us/delete/:id',async(req,res)=>{
  const {id} = req.params 
  const data = await contact_us.deleteOne({_id:id})
  return res.redirect('/contact')
})

// conatct us form as Clinet Enquiry
admin_router.post('/contact_us',dashboard.contactus)

// feedback form
admin_router.get('/feedback', async (req, res) => {
  const a = await feedback.find()
  res.render('feedback',{a})
})
// Delete feedback form 
admin_router.get('/feedback/delete/:id',async(req,res)=>{
  const {id} = req.params
  const data = await feedback.deleteOne({_id:id})
  return res.redirect('/feedback')
})

// notification form
admin_router.get('/notification', async (req, res) => {
  res.render('notification')
})














// Post request 











module.exports = admin_router
