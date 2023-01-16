require("dotenv").config();

const jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{
    const token = req.cookies.access_token
    if (!token) {
        return res.redirect('/')
      }
      try {
       const find = await jwt.verify(token,process.env.JWT_KEY);
       const {_id,role} = find
       const user = {
          _id,
          role
      }
      req.user = user;
      next()
      } 
       catch {
        res.redirect('/')
        
       
      }
    };
    module.exports=auth