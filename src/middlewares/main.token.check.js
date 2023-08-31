import jwt from 'jsonwebtoken';

export const mainCheckToken = (token) => {
  try {
    const SEC_KEY = process.env.SEC_KEY;
    const verifyToken = jwt.verify(token, SEC_KEY);
    return verifyToken;
  } catch (err) {
    return err.message;
  }
};
