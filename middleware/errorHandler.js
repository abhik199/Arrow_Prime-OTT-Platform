require('dotenv').config()
const joi = require('joi').ValidationError
const DEBUG_MODE = process.env.DEBUG_MODE
const customErrorandler = require('../service/customErrorHandler')

const errorHandler = (err , req,res,next)=>{
    let stauseCode = 500;
    let data = {
        message:'Internal Server error',
        ...(DEBUG_MODE === 'true' && {originError:err.message}   )
    }
    if(err instanceof joi){
        stauseCode = 422;
        data = {
            message : err.message
        }
    }
    if(err instanceof customErrorandler ){
        stauseCode = err.status
        data = {
            message:err.message
        }
    }
    return res.status(stauseCode).json(data)
}

module.exports = errorHandler