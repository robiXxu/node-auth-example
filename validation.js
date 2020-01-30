const Joi = require('@hapi/joi');

const registerValidate = (data) => Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).email(),
  password: Joi.string().min(3).required()
}).validate(data);

const loginValidate = (data) => Joi.object({
  email: Joi.string().min(6).email(),
  password: Joi.string().min(3).required()
}).validate(data);


module.exports = {
  registerValidate,
  loginValidate
};
