const userModels = require('../../models/users')
const joi = require('joi')
const bcrypt= require('bcrypt')
const customErrorHandler = require('../../service/customErrorHandler')
const userRegistration = async(req,res,next)=>{
    const userSchema = joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().min(8).required(),
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
        const exits = await userModels.exists({ email: req.body.email })
        if (exits) {
            return next(customErrorHandler.alreadyExist('email is already registered'))
        }

    } catch (error) {
        return next(error)
    }
    
    const { name, email,password, mobile, age, gender, city, state } = req.body
    // pashword hash 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModels({
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
    if(resulte){
        res.json({message:'User Registration Done'})
    }
}
module.exports={userRegistration}



