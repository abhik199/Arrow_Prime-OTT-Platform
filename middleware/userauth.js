const jwt = require('jsonwebtoken')
require('dotenv').config()
const USER_SECRET= process.env.USER_SECRET
const userauth = async(req,res,next)=>{
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        // return next(CustomErrorHandler.unAuthorized());
        // 401
        return res.json({message:'user unAuthorized'})
    }

    const token = authHeader.split(' ')[1];

    try {
        const { _id, role } = await jwt.verify(token,USER_SECRET);
        const user = {
            _id,
            role
        }
        req.user = user;
        next();

    } catch(err) {
        // return next(CustomErrorHandler.unAuthorized());
        return res.json({message:'user unAuthorized'})

    }

}


module.exports=userauth