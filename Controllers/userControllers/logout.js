const users = require("../../models/users");

// Delete Data in Data base


const userdelete = async(req,res,next)=>{
    try {
        const {id} = req.params
        const a = await users.findByIdAndDelete({_id:id})
        if(a){
            res.status(200).json({response:true,message:'user data successfully delete'})
        }
    } catch (error) {
        res.status(500).json({response:false,message:'Internal server error'})

        
    }
   
}



// LogOut using Token clear token
const userlogout = async(req,res,next)=>{
    try {
        res.clearCookie("access_token").status(200).json({ message: "User Successfully logged out" });
    } catch (error) {
        res.status(500).json({response:false,message:'Internal Server error'})
        
    }
     
    
    }

module.exports={userlogout,userdelete}