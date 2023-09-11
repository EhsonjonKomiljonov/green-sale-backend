import sha256 from 'sha256';
import { AdminModel } from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import { mainCheckToken } from '../middlewares/main.token.check.js';
import { sellerPostModel } from '../models/sellerPost.model.js';
import { buyerPostModel } from '../models/buyerPost.model.js';
import { categoryModel } from '../models/categories.model.js';
import { adminCheck } from '../middlewares/admin.check.js';
import fs from 'fs';
import path from 'path';

const SEC_KEY = process.env.SEC_KEY;

export class AdminContr {
  async loginAdmin(req, res) {
    try {
      const { admin_email, admin_password } = req.body;

      if (!admin_email || !admin_password) throw new Error('Incorrect values!');

      if (admin_email.length < 6) throw new Error('Incorrect admin email!');

      if (admin_password.length < 6)
        throw new Error('Incorrect admin password!');

      const getAdmin = await AdminModel.findOne({
        admin_email,
        admin_password: sha256(admin_password),
      });

      if (!getAdmin) throw new Error('Not Found admin!');

      const token = jwt.sign(
        {
          id: getAdmin._id,
          email: getAdmin.admin_email,
          password: getAdmin.admin_password,
        },
        SEC_KEY,
        {
          expiresIn: '3 days',
        }
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
  async addCategory(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const { name } = req.body;

      if (!name) throw new Error('Incorrect category name!');

      const addCat = await categoryModel.create({ name });

      return res.send({
        status: 200,
        message: 'category added!',
        data: addCat,
      });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const id = req.params?.id;
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const deletedCategory = await categoryModel.findOneAndDelete({ _id: id });

      if (!deletedCategory) throw new Error('Not Found category in id: ' + id);

      return res.send({
        status: 200,
        message: 'deleted category',
        deletedCategory,
      });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async editCategory(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const id = req.params?.id;
      const { name } = req.body;

      if (!name || name.length < 3) throw new Error('Incorrect category name!');

      const editedCategory = await categoryModel.findOneAndUpdate(
        { _id: id },
        req.body
      );

      if (!editedCategory) throw new Error('Not Found category in id: ' + id);
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async deleteSellerPost(req, res) {
    try {
      const id = req.params?.id;
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const findedPost = await sellerPostModel.findById(req.params.id);

      if (!findedPost) throw new Error('Not found seller post in id: ' + id);

      if (findedPost.imgLink) {
        for (let el of findedPost.imgLink) {
          if (fs.existsSync(path.join(process.cwd(), 'public', el))) {
            fs.unlinkSync(path.join(process.cwd(), 'public', el));
          }
        }
      }

      const deletedItem = await sellerPostModel.findByIdAndDelete(
        req.params.id
      );

      return res.send({
        status: 200,
        message: 'deleted',
        data: deletedItem,
      });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async deleteBuyerPost(req, res) {
    try {
      const id = req.params?.id;
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const deletedPost = await buyerPostModel.findOneAndDelete({ _id: id });

      return res.send({
        status: 200,
        message: 'deleted buyer post',
        deletedPost,
      });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
