import { UserModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { sendMail } from '../middlewares/email.check.js';
import sha256 from 'sha256';

config();
const SEC_KEY = process.env.SEC_KEY;
const host = process.env.host;

export class UserContr {
  async verifyEmail(req, res) {
    try {
      const { hashUrl } = req.params;

      if (hashUrl.split('$')[0]) {
        await UserModel.updateOne(
          { _id: hashUrl.split('$')[0] },
          { password: hashUrl.split('$')[1] }
        );

        return res.render('index');
      } else throw new Error('Incorrect user email!');
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async post(req, res) {
    try {
      const {
        first_name,
        last_name,
        region,
        district,
        address,
        email,
        password,
      } = req.body;
      const getUser = await UserModel.findOne({ email });

      if (getUser) throw new Error("Bunday User avval ro'yhatdan o'tgan!");

      const data = await UserModel.create({
        first_name,
        last_name,
        region,
        district,
        address,
        email,
        password: sha256(password),
      });

      const token = jwt.sign(
        { id: data._id, email: data.email, password: data.password },
        SEC_KEY
      );

      return res.send({
        status: 200,
        message: 'success',
        token,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new Error('Incorrect values!');

      if (!/^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/.test(email))
        throw new Error('Incorrect user email!');

      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))
        throw new Error('Incorrect user password!');

      const data = await UserModel.findOne({
        email,
        password: sha256(password),
      });

      if (!data) throw new Error('Incorrect email or password!');

      const token = jwt.sign(
        { id: data._id, email: data.email, password: data.password },
        SEC_KEY
      );

      return res.send({
        status: 200,
        message: 'success',
        token,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async resetPassword(req, res) {
    try {
      const { email, password } = req.body;

      const userId = await UserModel.findOne({ email });

      console.log(userId);

      await sendMail(
        email,
        'Green Sale',
        `<h1>Green Sale  <br/> Emailingizni tasdiqlang!</h1>
        <a 
        style="
          display: block; 
          width: 150px; 
          padding: 10px 20px;
          background-color: #275D2B;
          color: #fff;
          font-size: 20px;
          text-align: center;
          border-radius: 5px;
          text-decoration: none;
        "
        href="${
          host + '/users/verify-email/' + userId._id + '$' + sha256(password)
        }">Tasdiqlash</a>`
      );

      return res.send({
        status: 200,
        message: 'send verify to gmail!',
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
