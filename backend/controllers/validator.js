const Joi = require('joi')

const loginVAlidator = (data) => {
    const schema = Joi.object({
        email : Joi.string().min(6).email().required(),
        password : Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

const registerVAlidator = (data) => {
    const schema = Joi.object({
        email : Joi.string().min(6).email().required(),
        password : Joi.string().min(6).required(),
        username : Joi.string().min(6).required(),
        first_name : Joi.string().required(),
        last_name : Joi.string().required(),
    })
    return schema.validate(data)
}

module.exports = {
    loginVAlidator, 
    registerVAlidator
}