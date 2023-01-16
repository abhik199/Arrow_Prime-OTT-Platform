// to do
// find user access or not acces
//

const userModels= require("./adminControllers/dashboard");
const videosModels = require("../models/videos");
const catModel = require('../models/video_categories')

const userVideo = async(req,res)=>{
    try {
        const data = await videosModels.find().select('-__v')
        if(!data){
            return res.status(400).json({success:false,message:'data is not found'})
        }
        return res.status(200).json({success:true,data:data})
    } catch (error) {
        res.status(500).json({success:false,message:'Something Went Wrong'})
        
    }

}
const videocategor = async(req,res,next)=>{
    try {
        const data = await catModel.find().select('-__v')
        if(!data){
            return res.status(400).json({success:false,message:'data is not found'})
        }
        return res.status(200).json({success:true,data:data})
    } catch (error) {
        res.status(500).json({success:false,message:'Something Went Wrong'})
        
    }
}
module.exports = {userVideo,videocategor}




