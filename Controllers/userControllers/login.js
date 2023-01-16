require('dotenv').config()
const userModels = require('../../models/users')
const joi = require('joi')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const customErrorHandler = require('../../service/customErrorHandler')

const userLogin = async (req, res, next) => {
    // validate login page
    const loginSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })
    const { error } = loginSchema.validate(req.body)
    if (error) {
        return next(error)
    }
    // cheack email 
    try {
        const user = await userModels.findOne({ email: req.body.email });
        if (!user) {
            return next(customErrorHandler.wrongCredentials());
        }
        // compare the password
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return next(customErrorHandler.wrongCredentials());
        }
        // Jwt token use 
        const token = jwt.sign({_id:user._id,role:user,},process.env.USER_SECRET,{expiresIn :'182d'})
        res.json({token})
        
    } catch(err) {
        return next(err);
    }
}
module.exports={userLogin}