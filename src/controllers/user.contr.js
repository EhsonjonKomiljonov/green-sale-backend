import { UserModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { sendMail } from '../middlewares/email.check.js';
import sha256 from 'sha256';

config();
const SEC_KEY = process.env.SEC_KEY;
const host = process.env.host;

export class UserContr {
  async myProfile(req, res) {
    try {
      const token = req.headers?.authorization;

      const checkToken = jwt.verify(token, SEC_KEY);

      if (typeof checkToken != 'string') {
        const data = await UserModel.findOne({ _id: checkToken.id });

        return res.send({
          status: 200,
          message: 'success',
          data,
        });
      }
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async editMyProfileInfo(req, res) {
    try {
      if (!Object.keys(req.body)[0]) throw new Error('Incorrect values!');
      const token = req.headers?.authorization;

      const checkToken = jwt.verify(token, SEC_KEY);

      if (typeof checkToken != 'string') {
        const data = await UserModel.updateOne(
          { _id: checkToken.id },
          req.body
        );

        return res.send({
          status: 201,
          message: 'updated',
        });
      }
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async editMyProfileSec(req, res) {
    try {
      const token = req.headers?.authorization;
      const { oldPassword, newPassword, returnNewPassword } = req.body;

      if (!oldPassword || !newPassword || !returnNewPassword)
        throw new Error('Incorrect values!');

      if (newPassword.length < 6)
        throw new Error("Parol eng kami 6 ta bo'lishi mumkin!");

      if (newPassword.length > 60)
        throw new Error("Parol eng ko'pi 60 ta bo'lishi mumkin!");

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(newPassword))
        throw new Error('Incorrect password!');

      if (newPassword != returnNewPassword)
        throw new Error("Yangi parol noto'g'ri tasdiqlangan!");

      const getToken = jwt.verify(token, SEC_KEY);

      if (typeof getToken != 'string') {
        await UserModel.updateOne(
          { _id: getToken.id },
          { password: sha256(newPassword) }
        );

        return res.send({
          status: 201,
          message: 'updated',
        });
      }
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
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
        SEC_KEY,
        { expiresIn: '3 days' }
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

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password))
        throw new Error('Incorrect user password!');

      const data = await UserModel.findOne({
        email,
        password: sha256(password),
      });

      if (!data) throw new Error('Incorrect email or password!');

      const token = jwt.sign(
        { id: data._id, email: data.email, password: data.password },
        SEC_KEY,
        { expiresIn: '3 days' }
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
