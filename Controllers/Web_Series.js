require('dotenv').config()

const express =  require('express')
const web_routes = express.Router()


const episode = require("../models/episode");
const Season = require("../models/Season");
const series = require("../models/series");
const videoCategorey = require('../models/video_categories')
// episode
// Season

// series

// Multer Image Upload
const multer = require("multer");
const path = require('path');
const { find, findById } = require('../models/episode');
const video_categories = require('../models/video_categories');
const manage_Price = require('../models/manage_Price');
// const series = require('../models/series');
const { Mongoose, default: mongoose } = require('mongoose');
const { nextTick } = require('process');
const { json } = require('body-parser');
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

// const upload = multer({ storage: storage });
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: '../public/userImages', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const upload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 100000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

// Reder Web series edit update
// Web Series All Routes Defiend
// Manage Series 
web_routes.get('/manage_series', async (req, res) => {
    const a = await series.find()
    
    res.render('series/manage_series', {a})
  })
// Add new series
web_routes.get('/add_series', async (req, res) => {
    const videocategories  = await videoCategorey.find()
    res.render('series/add_series',{videocategories })
})
 // Edit Series
web_routes.get('/edit_series/:id', async (req, res) => {
    const {id} = req.params
    const user = await series.findById({_id:id})
    res.render('series/edit_series',{user})
  
})

// Delete Series
web_routes.get("/series/delete/:id",async(req,res)=>{
    const {id} = req.params
    const data = await series.deleteOne({_id:id})
    return res.redirect('/manage_series') 
})





var uploadimages = upload.fields([{ name: 'thumbnail_image', maxCount: 1 }, { name: 'poster', maxCount: 1 }])
web_routes.post('/edit_series/:id',uploadimages,async(req,res)=>{
    const obj = Object.assign({},req.files)
    const {id} = req.params
   
   
    try {
        const {title,actor,writer,director,release_date,description} = req.body
        const updates = {
            title,
            actor,
            director,
            release_date,
            description,
        }
        if(obj.thumbnail_image && obj.poster){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            const poster =process.env.image_url+req.files.poster[0].filename
            updates.thumbnail_image=thumbnail_image
            updates.poster=poster
        }
        else if(obj.thumbnail_image){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            updates.thumbnail_image=thumbnail_image
        }
        else if(obj.poster){
            const poster =process.env.image_url+req.files.poster[0].filename
            updates.poster=poster
        }
        const data = await series.findByIdAndUpdate({_id:id},{$set:updates})
        return res.redirect('/manage_series')
    } catch (error) {
        return res.status(500).json({message:'Internal Servar error',originalError:error})
        
    }
  })






// Manage Session

web_routes.get('/manage_session/:id', async (req, res) => {
     
    
    const seriesID = await series.findById(req.params.id)
    // const seriesh = seriesID.season
    const  seriesh = await  Season.find({ series_ID : req.params.id})
    const ID = seriesID._id
    const as = seriesID.title
    res.render('series/manage_session', { seriesh,as,ID,} )
  
})

// Add New Session
web_routes.get('/add_season/:id',async(req,res)=>{
    res.render('series/add_session',{Id:req.params.id})
    
})


web_routes.get('/testRoutes',async(req,res)=>{
    const a = await series.find()
    res.send(a)
})



web_routes.post('/add_season/:Id',async(req,res,next)=>{
    const id = req.params.Id
    const season = new Season({
        season_name:req.body.season_name ,
        series_ID:req.params.Id,
    }) 

    // await season.save((err) => {
    //     if(err){
    //         return next(err)
    //     }
    // }) 
  

    // const seriess = await series.findById(req.params.Id) ;
    // seriess.season.push(season.season_name);

    await season.save() ;
    return res.redirect('/manage_session/'+id)

    // res.send("okk")


})

// delete session

web_routes.get("/session/delete/:id",async(req,res , next)=>{
    const id = req.params.id
    const series_Id = await Season.findById(id)
    const season_id = series_Id.series_ID
    
    // let seriesh  = await series.findById(series_Id.series_ID)
    // // seriesh.season =  seriesh.season.filter((element)=>{
    // //     element != series_Id.season_name
    // // })
    // for(let i =0 ; i < seriesh.season.length ; i++){
    //     if(seriesh.season[i] === series_Id.season_name){
    //         seriesh.season.splice(i , 1)
    //     }
    // }

    // await seriesh.save((err)=>{
    //     if(err){
    //         return next(err)
    //     }
    // })
    // await seriesh.save()
    // console.log(series_Id.season_name);





    // Delete episode
    await episode.deleteMany({season:id})
    await Season.deleteOne({_id:id})
    
    
    res.redirect('/manage_session/'+season_id)






   

   
})





// delete Episode base on session
web_routes.get('/delete_episode/:id',async(req,res)=>{
    const id = req.params.id
    const series_Id = await episode.findById(id)
    const season_id = series_Id.season
    // console.log(season_id);
    // console.log(series_Id);
    await episode.deleteOne({_id:id})
    res.redirect('/manage_episode/'+season_id)
    
})





// Manage Episode 
  // manage episode



// web_routes.get('/edit_session',  async (req, res) => {
//     res.render('series/edit_session')
//   })
// web_routes.post('/edit_session', async (req, res) => {
  
//   })
  
  // post for episode
web_routes.get('/edit_episode', async (req, res) => {
    res.render('series/edit_episode')
  })



// Api Routes for Series and Session and Episode


// all series Get 
web_routes.get('/series',async(req,res)=>{
    try {
        const fdata  = await series.find()
        if(!fdata){
            return res.status(404).json({success:false,message:'Data is Not Found'})
        }
        return res.status(200).json({success:true,data:fdata})

        
    } catch (error) {
        return res.status(502).json({success:false,message:"Something Went wrong"})
    }
})

// series by session get

web_routes.get('/series/:id',async(req,res)=>{
    try {
        const id = req.params.id
       
        const fdata = await Season.find({series_ID:id}).select('-__v -series_ID -episode')
      
        if(!fdata){
            return res.json({success:false,message:'data is Not found'})
        }
        return res.status(200).json({success:true,data:fdata})
        
    } catch (error) {
        return res.status(404).json({success:false,message:'Bad Request'})
    }
})


// for the Episode api 
// get the app episode

web_routes.get('/season/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const fdata = await episode.find({season:id}).select('-__v -season')
        if(!fdata){
            return res.status(400).json({success:false,message:'data is not Found'})
        }
        return res.status(200).json({success:true,data:fdata})

        
    } catch (error) {
        return res.status(404)
        .json({success:false,message:'bad request'})
        
    }
})


// get single episode using sing id


web_routes.get('/episode/:id',async(req,res)=>{
    try {
        const fdata = await episode.findOne({_id:req.params.id}).select('-__v -season')
        if(!fdata){
            return res.status(404).json({success:false,message:'datais not found'})
        }
        return res.status(200).json({success:true,data:fdata})
        
    } catch (error) {
        return res.status(400).json({success:false,message:'bad request'})
        
    }
})









// Series Secation create 
var uploadimage = upload.fields([{ name: 'thumbnail_image', maxCount: 1 }, { name: 'poster', maxCount: 1 }])

web_routes.post('/add_series',uploadimage,async(req,res)=>{
    const obj = Object.assign({},req.files)
   
    try {
        const {title,actor,writer,director,release_date,description,series_cat_id ,season} = req.body
        const post = new series({
            title,
            actor,
            writer,
            director,
            release_date,
            description,
            series_cat_id,
            season
        })
        if(obj.thumbnail_image && obj.poster){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            const poster =process.env.image_url+req.files.poster[0].filename
            post.thumbnail_image=thumbnail_image
            post.poster=poster
        }
        else if(obj.thumbnail_image){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            post.thumbnail_image=thumbnail_image
        }
        else if(obj.poster){
            const poster =process.env.image_url+req.files.poster[0].filename
            post.poster=poster
        }
         await post.save()
         return res.redirect('/manage_series')
    } catch (error) {
        return res.status(500).json({message:'Internal Servar error',originError:error})
        
    }

 })


 // Get requse


web_routes.get('/getdata',async(req,res)=>{
    try {
        const a = await series.find().populate('Season')
        if(!a){
            return res.json({success:false,message:'Data is not Find'})
        }
        return res.json({success:true,data:a})

        
    } catch (error) {
        return res.json({success:false,message:'Internal Servar error'})
        
    }
})

 // Session Request post 
 web_routes.post('/add_session',async(req,res)=>{
    try {
        const data = new Season(req.body)
        const fdata = await data.save()
        if(!fdata){
            return res.json({message:'Data not find'})
        }
        return res.json({resulte:true,data:fdata})
    } catch (error) {
        return res.json({message:'Internal Servar error',error:error})
        
    }
 })


 // Manage Episode

web_routes.get("/all_get",async(req,res)=>{
    const a = await series.find().populate('season')
    res.json({data:a})
})





// Render All Files it means Logical thinkng
web_routes.get('/add_episode')









// add Episode

web_routes.post('/add_episode/:id', uploadimage,async(req,res)=>{
    const id = req.params.id
    console.log(id);
    const obj = Object.assign({},req.files)
    try {
        const {season,url_type,url,episode_name,base_url,unlock_content,description} = req.body
        const post = new episode({
            season,
            url_type,
            url,
            episode_name,
            base_url,
            unlock_content,
            description
        })
        if(obj.thumbnail_image && obj.poster){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            const poster = process.env.image_url+req.files.poster[0].filename
            post.thumbnail_image = thumbnail_image
            post.poster=poster
        }
        else if (obj.thumbnail_image){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            post.thumbnail_image = thumbnail_image

        }
        else if (obj.poster){
            const poster = process.env.image_url+req.files.poster[0].filename
            post.poster

        }
        const maindata  = await post.save()
        return res.redirect('/manage_episode/'+id)
    
        
    } catch (error) {
        return res.json({message:'Internal Servar Problem'})
        
    }
})

// Edit Episode Page render
web_routes.get('/edit_episode/:id',async(req,res)=>{
    // const videocategories  = await  Season.find({ _id : req.params.id})
    // // const  =  await episode.find()
    const videocategorie  = await manage_Price.find()
    const ID3 = req.params.id
    // res.render('series/add_episode',)
    const id = req.params.id
    const series_Id = await episode.findById(id)
    const ID4= series_Id.season

    const match = await episode.findById(req.params.id)

    

    
    res.render('series/edit_episode',{videocategorie,ID3,match,ID4})

})






// Edit Episode
web_routes.post('/edit_episode/:id',uploadimage,async(req,res)=>{
    const id = req.params.id
    const obj = Object.assign({},req.files)
    try {
        const {url_type,url,episode_name,base_url,unlock_content,description} = req.body
        const updates = {
            url,
            url_type,
            episode_name,
            base_url,
            unlock_content,
            description
        }
        if(obj.thumbnail_image && obj.poster){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            const poster = process.env.image_url+req.files.poster[0].filename
            updates.thumbnail_image = thumbnail_image
            updates.poster = poster
        }
        else if (obj.thumbnail_image){
            const thumbnail_image = process.env.image_url+req.files.thumbnail_image[0].filename
            updates.thumbnail_image = thumbnail_image

        }
        else if (obj.poster){
            const poster = process.env.image_url+req.files.poster[0].filename
            updates.poster = poster
        }
        const finaldata = await episode.findByIdAndUpdate({_id:id},{$set:updates})
        
        // const id = req.params.id
        const series_Id = await episode.findById(id)
        const season_id = series_Id.season
        return res.redirect('/manage_episode/'+season_id)
         
    } catch (error) {
        res.json({success:false,originError:error})
        
    }
})



web_routes.get('/manage_episode/:id',  async (req, res) => {
    const seasonId = await Season.findById(req.params.id)
    console.log(seasonId);
    const a = await episode.find({season:req.params.id})
    // console.log(a.season);
    console.log(req.params.id);
    // console.log(a.season);
    const seriesID = await Season.findById(req.params.id)
    // const seriesID = await series.findById(req.params.id)
    // const seriesh = seriesID.season
    // const  seriesh = await  episode.find({ series_ID : req.params.id})
   
    // const seriesh = seriesID.season
    
    const {id} = req.params
    const series_Id = await Season.findById(id)
    const ID2 = series_Id.series_ID




    const ID = seriesID._id
    const as = seriesID.title
    res.render('series/manage_episode',{ID , as ,a,ID2})
})

// add new episode
web_routes.get('/add_episode/:id',async(req,res)=>{
    const videocategories  = await  Season.find({ _id : req.params.id})
    // const  =  await episode.find()
    const videocategorie  = await manage_Price.find()
    const ID = req.params.id
    res.render('series/add_episode',{videocategories,videocategorie,ID})
})





module.exports=web_routes


