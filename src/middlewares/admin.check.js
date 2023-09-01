import sha256 from 'sha256';
import { AdminModel } from '../models/admin.model.js';
import { mainCheckToken } from './main.token.check.js';

export const adminCheck = async (req, res) => {
  try {
    const token = req.headers?.authorization;
    const id = req.params?.id;

    const getToken = mainCheckToken(token);

    const checkAdmin = await AdminModel.findOne({
      admin_email: getToken?.email,
      admin_password: getToken?.password,
    });

    if (!checkAdmin) throw new Error('You are not an Admin!');

    return;
  } catch (err) {
    return err.message;
  }
};
