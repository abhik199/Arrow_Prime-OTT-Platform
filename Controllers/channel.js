const tvchannels = require("../models/tvchannels");
const tv_categories = require("../models/tv_categories");

const tvcategories = async(req,res)=>{
    try {
        const data = await tv_categories.find()
        if(!data){
            return res.status(500).json({response:false,message:'Data is Not Find'})
        }
        res.status(200).json({response:true,data})
    } catch (error) {
        res.status(500).json({response:false,message:'Internal server error'})
    }
}






