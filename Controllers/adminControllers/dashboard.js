const joi = require('joi')
const videoModels = require('../../models/videos')
const video_category = require('../../models/video_categories')
const userModels = require('../../models/users')
const adminModels = require('../../models/admins')
const tv_categories = require('../../models/tv_categories')
const tv_channels = require('../../models/tvchannels')
const manage_Price = require('../../models/manage_Price')
const notification = require('../../models/notification')
const feedback = require('../../models/feedback')
const contact_us = require('../../models/contact_us')
const adverisement = require('../../models/adverisement')
require('dotenv')

// dashbord 
const Dashbord = async (req, res, next) => {
  // dasboard code
  const user = await userModels.countDocuments({})
  const tvCategorie = await tv_categories.countDocuments({})
  const tvchannel = await tv_channels.countDocuments({})
  const video = await videoModels.countDocuments({})
  const categories = await video_category.countDocuments({})
  const notf = await notification.countDocuments({})
  const mprice = await manage_Price.countDocuments({})
  const feed = await feedback.countDocuments({})
  res.render('dashboard', { video, categories, user,tvCategorie,tvchannel,notf,mprice,feed})
}




// All render file
// User Files
const user = async (req, res) => {
  const data = await userModels.find()
  res.render('user', { a: data })
}

// create video 
const createVideo = async (req, res) => {
  const w = await video_category.find()
  const videocategorie = await manage_Price.find()

  res.render('create_video', { videocategories: w, videocategorie })
}


// create video Category
const videoCat = async (req, res, next) => {
  const data = await video_category.find()
  res.render('video_category', { a: data })
}

// create tv categories
const tvcat = async (req, res) => {
  const data = await tv_categories.find()
  res.render('tv_category', { a: data })
}

// create tv channel 
const tvchal = async (req, res) => {
  const data = await tv_channels.find()
  res.render('tv_channels', { a: data })
}

// get reguest to direct open
const manageVideo = async (req, res) => {
  const data = await videoModels.find()
  res.render('manage_video', { a: data })

}
const createVideo1 = async (req, res) => {
  const w = await tv_categories.find()
  const videocategorie = await manage_Price.find()
  res.render('create_tv', { videocategories: w, videocategorie })
}

// add tv categorey
const addcat = async (req, res) => {
  res.render('add_category')
}

const rendereditvideocat = async(req,res)=>{
  const {id} = req.params
  const a = await video_category.findById({_id:id})
  res.render('edit_videocat',{user:a})
}


// post request
const tvcatupdate1 = async (req, res) => {
  const { id } = req.params
  try {
    if (req.file) {
      const a = await tv_categories.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { category_name: req.body.category_name } })
    }
    else {
      await tv_categories.findByIdAndUpdate({ _id: id })


    }

    res.redirect('/tv_category')
    console.log(id);
    console.log(req.body);
  }

  catch (error) {
    res.redirect('/tv_category')
    console.log(error);


  }

}

// get request 
const tvcatupdate = async (req, res) => {
  try {
    const { id } = req.params
    const user = await tv_categories.findById({ _id: id })
    if (user) {
      res.render('edit_tvcat', { user })
    }
    else {
      res.redirect('/tv_category')
    }

  } catch (error) {

  }

  // const aa = await tv_categories.findByIdAndUpdate(id,req.body)
  // console.log(aa);
}











// Post Request for Tv categories
const posttvcat = async (req, res, next) => {
  try {
    const cat = new video_category({
      category_name: req.body.category_name,
      insertedDateTime: new Date()
    })
    // save file all file
    const a = await cat.save()
    if (!a) {
      res.json({ message: "A Cataegory fail" })
    }
    res.redirect('/video_category')

  }
  catch (error) {
    return next(error)

  }

}

  // Post Request for video Categoriesw

  // const postvideocat = async (req, res, next) => {
  //   try {
  //     const cat1 = new video_category({
  //       category_name: req.body.category_name,
  //       insertedDateTime: new Date()
  //     })
  //     // save file all file
  //     const a = await cat1.save()
  //     if (!a) {
  //       res.json({ message: "A Cataegory fail" })
  //     }

  //   }
  //   catch (error) {
  //     return next(error)

  //   }
  // }
  // Edit and Delete Routes
 


  //  video edit for manage

  const editVideo = async (req, res, next) => {
    const { id } = req.params
    const user = await videoModels.findOne({ _id: id })
    const videocategories = await video_category.find()
    const videocategorie = await manage_Price.find()
    res.render('Edit', { videocategories, videocategorie, user })
}
//   const cheackEdit = async (req, res, next) => {
//     const { id } = req.params
//     try {
//       const edit = await videoModels.findByIdAndUpdate(id, req.body, {
//         new: true
//       })
//       res

//     } catch (error) {
//       return next(error)
//     }
//   }
// }

const editchannel = async (req, res) => {
  const { id } = req.params
  const user = await tv_channels.findOne({ _id: id })
  const data = await tv_categories.find()
  const videocategorie = await manage_Price.find()
  res.render('edit_tvchal', { videocategories: data, videocategorie, user })

}
const addvideocat = async (req, res) => {
  res.render('add_video_cat')
}
// Series Part 
const allseries = {
  showseries: async (req, res) => {
    res.render('series')
  }
  // 
}

// Manage Price Secation


// view all Price
const show_price = async (req, res) => {
  const data = await manage_Price.find()
  res.render('price/price', { data })
}

// add new Price
const add_price = async (req, res) => {
  res.render('price/addprice')
}
// Edit Price

const addprice = async (req, res) => {
  try {
    const models = new manage_Price(req.body)
    const save = await models.save()
    res.redirect('/price')

  } catch (error) {
    return next(error)

  }
}

const editviews = async (req, res) => {
  const { id } = req.params
  const okk = await manage_Price.findById({ _id: id })
  if (!okk) {
    res.redirect('/price', { message: 'id is not found' })
  }
  res.render('price/editprice', { data: okk })

}


// Edit Price secation 

const edit_price = async (req, res) => {
  const { id } = req.params
  try {
    const { price, product_key } = req.body
    const d = await manage_Price.findByIdAndUpdate({ _id: id }, { $set: { price: price, product_key: product_key } })
    res.redirect('/price')
  } catch (error) {
    res.json({ message: 'Internal Servar Error' })


  }
}

// Delete Single file

const delete_price = async (req, res) => {
  const { id } = req.params
  const data = await manage_Price.deleteOne({ _id: id })
  res.redirect('/price')
}

// Send Notification 

const sendNoti = async (req, res) => {
  try {
    const data = new notification(req.body)
    await data.save()
    res.redirect('/notification')



  } catch (error) {
    res.json({ msg: 'problem' })

  }
}

// feedback from request

const feedbackform = async (req, res) => {
  try {
    const data = new feedback(req.body)
    const fdata = await data.save()
    if (!fdata) {
      return res.status(404).json({ response: false, message: 'Feedback Form Not send' })
    }
    res.status(200).json({ response: true, message: 'feedback Form Send' })


  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' })

  }
}
// conatct us form 
const contactus = async (req, res) => {
  try {
    const data = new contact_us(req.body)
    const savedata = await data.save()
    if (!savedata) {
      return res.status(404).json({ success: false, message: 'Conatct_us failed' })
    }
    return res.status(200).json({ success: true, message: 'successfully Conatct' })

  } catch (error) {
    return res.status(500).json({ success:false,message: 'Internal Server error' })

  }
}

const managePrice = async (req, res) => {
  try {
    const data = await manage_Price.find()
    if (!data) {
      return res.status(404).json({ response: false, message: 'Something Went Wrong' })
    }
    res.status(200).json({ response: true, data: data })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' })


  }
}

// notification is user pannels
const sendnotification = async (req, res) => {
  try {
    const data = await notification.find()
    if (!data) {
      return res.status(404).json({ response: false, message: 'notification error' })
    }
    res.status(200).json({ response: true, data: data })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' })

  }
}

const tvcategorie = async (req, res) => {
  try {
    const data = await tv_categories.find()
    if (!data) {
      return res.status(404).json({ response: false, message: 'tv Categories is not found' })
    }
    res.status(200).json({ response: true, data: data })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' })

  }
}
const tvChannel = async (req, res) => {
  try {
    const data = await tv_channels.find().populate('Manage_Price')



    if (!data) {
      return res.status(404).json({ response: false, message: 'data is not Found' })
    }
    res.status(200).json({ response: true, data: data })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server error', error: error })

  }
}


// advertisement start
// simple render add
const rederAdd = async(req,res)=>{
  const data = await adverisement.find()
  res.render('Advertisement/advertisement',{data})
}


const rederEdit = async(req,res)=>{
  //  const {id} = req.params
  //  const data = await adverisement.findOne({_id:id})
   return res.render('Advertisement/add_ads')
}

const send_ads = async(req,res)=>{
  const data = new adverisement(req.body)
  const fdata = await data.save()
  if(!fdata){
    return res.status(400).json({success:false,error:'Data is Not save'})
  }
  return res.redirect()

  
}
const sendads = async(req,res)=>{
  try {
    const data = await adverisement.find().select('-__v')
    if(!data){
      return res.status(400).json({success:false,message:'data not found'})
    }
    return res.status(200).json({success:true,message:'data found',data:data})
    
  } catch (error) {
    return res.status(500).json({success:false,message:'Internal Servar error'})
    
  }
}






module.exports = {
  Dashbord,
  user,
  videoCat,
  createVideo,
  manageVideo,
  posttvcat,
  tvcat,
  tvchal,
  createVideo1,
  addcat,
  tvcatupdate,
  tvcatupdate1,
  editchannel,
  addvideocat,
  add_price,
  show_price,
  addprice,
  edit_price,
  editviews,
  delete_price,
  sendNoti,
  feedbackform,
  contactus,
  managePrice,
  sendnotification,
  tvcategorie,
  tvChannel,
  editVideo,
  rederAdd,
  rederEdit,
  rendereditvideocat,
  sendads

}