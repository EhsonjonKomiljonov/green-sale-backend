import Joi from 'joi';

export const userCheck = (req, res, next) => {
  try {
    const validateUser = Joi.object({
      first_name: Joi.string().required().min(3).max(60),
      last_name: Joi.string().required().min(3).max(60),
      email: Joi.string().email().required().min(6).max(150),
      region: Joi.string().required().min(3).max(50),
      district: Joi.string().required().min(3).max(50),
      address: Joi.string().required().min(2).max(50),
      contact: Joi.string().required().min(9).max(13),
      password: Joi.string()
        .required()
        .min(6)
        .max(60)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')),
    });

    const checkUser = validateUser.validate(req.body);

    if (checkUser?.error) throw new Error(checkUser.error);

    next();
  } catch (err) {
    return res.send({
      status: 501,
      message: err.message,
      data: null,
    });
  }
};

export const userEditCheck = (req, res, next) => {
  try {
    const validateUser = Joi.object({
      first_name: Joi.string().min(3).max(60),
      last_name: Joi.string().min(3).max(60),
      email: Joi.string().email().min(6).max(150),
      region: Joi.string().min(3).max(50),
      district: Joi.string().min(3).max(50),
      address: Joi.string().min(2).max(50),
      contact: Joi.string().required().min(9).max(13),
    });

    const checkUser = validateUser.validate(req.body);

    if (checkUser?.error) throw new Error(checkUser.error);

    next();
  } catch (err) {
    return res.send({
      status: 501,
      message: err.message,
      data: null,
    });
  }
};
