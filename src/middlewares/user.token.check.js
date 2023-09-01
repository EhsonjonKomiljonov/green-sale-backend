import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';
export const checkToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    if (token) {
      const checkedToken = jwt.verify(token, process.env.SEC_KEY);

      if (checkedToken?.id) {
        const user = await UserModel.findById(checkedToken.id);
        if (user) {
          req.user = user;
          return next();
        } else throw new Error('Invalid Token !!!');
      } else throw new Error('Invalid Token !!!');
    } else throw new Error('Unauthorized');
  } catch (err) {
    return res.send({
      status: 401,
      message: err.message,
      data: null,
    });
  }
};
