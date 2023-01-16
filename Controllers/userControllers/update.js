const userModels = require('../../models/users')
const joi = require('joi')
const bcrypt= require('bcrypt')

const userUpdate = async(req,res,next)=>{
    const userSchema = joi.object({
        name:joi.string().optional(),
        email:joi.string().email().required(),
        password:joi.string().max(8).required(),
        mobile:joi.number().optional(),
        age:joi.number().optional(),
        gender:joi.string().optional(),
        city:joi.string().required(),
        state:joi.string().required()
    })
    const {error} = userSchema.validate(req.body)
    if(error){
        return next(error)
    }
     // cheack enail validation
     try {
        const exits = await registrationModels.exists({ email: req.body.email })
        if (exits) {
            return next(customErrorHandler.alreadyExist('email is already registered'))
        }

    } catch (error) {
        return next(error)
    }
    
    const { name, email,password, mobile, age, gender, city, state } = req.body
    // pashword hash 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new registrationModels({
        name,
        email,
        password :hashedPassword,
        mobile,
        age,
        gender,
        city,
        state
    })
    const resulte =  await user.save()
}
module.exports={userUpdate}



