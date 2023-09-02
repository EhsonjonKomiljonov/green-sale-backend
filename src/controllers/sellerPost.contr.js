import { categoryModel } from '../models/categories.model.js';
import { sellerPostModel } from '../models/sellerPost.model.js';
import fs from 'fs';
import path from 'path';
import { buyerPostModel } from '../models/buyerPost.model.js';
export class sellerPostContr {
  async sellerPostAdd(req, res) {
    try {
      const {
        categoryId,
        name,
        price,
        capacity,
        capacityMeasure,
        type,
        region,
        district,
        description,
        contact,
      } = req.body;
      if (
        categoryId &&
        name &&
        price &&
        capacity &&
        capacityMeasure &&
        type &&
        region &&
        district &&
        description &&
        contact
      ) {
        const filenames = [];

        for (let el of req.files) {
          const filename = el.filename.replace('/', '');

          filenames.push('/' + filename);
        }
        if (req.files.length) {
          const newPost = await sellerPostModel.create({
            category_ref_id: categoryId,
            user_ref_id: req.user._id,
            name,
            price,
            capacity,
            capacityMeasure,
            type,
            region,
            district,
            description,
            contact,
            imgLink: filenames,
          });

          return res.send({
            status: 200,
            message: null,
            data: newPost,
          });
        } else throw new Error('img is required');
      } else
        throw new Error(
          'Required values categoryId, name, price, capacity, capacityMeasure, type, region, district, description, contact, !!!'
        );
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async sellerPostGet(req, res) {
    try {
      let data = [];
      data = await sellerPostModel.find();
      if (req.query?.categoryId) {
        data = await sellerPostModel.find({
          category_ref_id: req.query.categoryId,
        });
      }

      return res.send({ status: 200, message: null, data });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async sellerPostGetPosts(req, res) {
    try {
      let data = [];
      data = await sellerPostModel.find().limit(3);
      data.push(...(await buyerPostModel.find().limit(3)));
      return res.send({ status: 200, message: null, data });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async sellerPostGetId(req, res) {
    try {
      const data = await sellerPostModel
        .findById(req.params.id)
        .populate('category_ref_id');
      return res.send({ status: 200, message: null, data });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async sellerPostPut(req, res) {
    try {
      const { name, price, capacity, capacityMeasure, type, description } =
        req.body;
      const findedPost = await sellerPostModel.findById(req.params.id);

      if (!findedPost) {
        throw new Error('buday post mavjud emas!!!');
      }
      if (
        (name || price || capacity || capacityMeasure || type || description) &&
        toString(req.user._id) == toString(findedPost.user_ref_id)
      ) {
        const filenames = [];
        if (req.files.length) {
          for (let el of req.files) {
            filenames.push('/' + el.filename);
          }
          for (let el of findedPost.imgLink) {
            if (fs.existsSync(path.join(process.cwd(), 'public', el))) {
              fs.unlinkSync(path.join(process.cwd(), 'public', el));
            }
          }
        }

        const post = await sellerPostModel.findByIdAndUpdate(req.params.id, {
          name: name ? name : findedPost.name,
          price: price ? price : findedPost.price,
          capacity: capacity ? capacity : findedPost.capacity,
          capacityMeasure: capacityMeasure
            ? capacityMeasure
            : findedPost.capacityMeasure,
          type: type ? type : findedPost.type,
          description: description ? description : findedPost.description,
          imgLink: filenames.length ? filenames : findedPost.imgLink,
        });

        return res.send({
          status: 200,
          message: null,
          data: post,
        });
      } else throw new Error('Sizning buday postingiz mavjud emas !!');
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async sellerPostDelete(req, res) {
    try {
      const findedPost = await sellerPostModel.findById(req.params.id);

      if (!findedPost) {
        throw new Error('buday post mavjud emas!!!');
      }

      if (toString(req.user._id) == toString(findedPost.user_ref_id)) {
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
      } else throw new Error('Sizning buday postingiz mavjud emas !!!');
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
