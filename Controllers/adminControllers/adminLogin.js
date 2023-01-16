
require("dotenv").config();

const jwt = require('jsonwebtoken')
const Admin = require('../../models/admins')
const forgot = async(req,res)=>{
    res.render('forgot')
}
const adminlogin = async (req, res) => {

    if(req.cookies.access_token == null){
        res.render('index',{errorMsg:''});
    }
    else{
        res.redirect('/dashboard')
    }
   

}

const verifylogin = async (req, res, next) => {
   try {
        const user = await Admin.findOne({username:req.body.username,password:req.body.password})
        if(!user){
            res.render('index',{errorMsg:"invalid username or password "})
        }
        else{
            if(req.cookies.access_token){
                res.redirect('dashboard')
            }
            access_token = await jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY,{ expiresIn: '12h' })
            res.cookie('access_token',access_token,{
                httpOnly:true,
            }).status(200).redirect('dashboard')
           
        }
    } catch (error) {
        res.json(error)
        
    }
    
} 
    
const adminlogout = async (req, res) => {
    return res
    .clearCookie("access_token")
    .status(200).redirect('/')
   

}
module.exports={adminlogin,verifylogin,adminlogout,forgot}
