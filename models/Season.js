const mongoose = require('mongoose')
const seasonSchema = mongoose.Schema({

    season_name:{
        type:String,
        required:true
    },
    episode:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Episodes',
      
    }] ,
    series_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seriesh"
    }
   
     
})

module.exports=mongoose.model('season',seasonSchema)