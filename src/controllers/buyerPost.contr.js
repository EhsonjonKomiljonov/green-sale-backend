import { buyerPostModel } from '../models/buyerPost.model.js';

export class buyerPostContr {
  async buyerPostAdd(req, res) {
    try {
      const {
        categoryId,
        name,
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
        capacity &&
        capacityMeasure &&
        type &&
        region &&
        district &&
        description &&
        contact
      ) {
        const newPost = await buyerPostModel.create({
          category_ref_id: categoryId,
          user_ref_id: req.user._id,
          name,
          capacity,
          capacityMeasure,
          type,
          region,
          district,
          description,
          contact,
        });

        return res.send({
          status: 200,
          message: null,
          data: newPost,
        });
      } else
        throw new Error(
          'Required Values categoryId, name, price, capacity, capacityMeasure,region, description, district, type, contact !!!'
        );
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async buyerPostGet(req, res) {
    try {
      let pages = Math.ceil((await buyerPostModel.countDocuments()) / 10);
      let data = [];
      data = await buyerPostModel
        .find()
        .skip((req.query?.page - 1) * 10)
        .limit(10);

      if (req.query?.categoryId) {
        data = await buyerPostModel.find({
          category_ref_id: req.query.categoryId,
        });
        pages = Math.ceil(data.length / 10);
      }

      if (req.query?.search) {
        data = await buyerPostModel.find({
          name: { $regex: req.query?.search, $options: 'i' },
        });
        pages = Math.ceil(data.length / 10);
      }

      if (req.params?.id) {
        data = await buyerPostModel
          .findOne({
            _id: req.params.id,
          })
          .populate('comments');
      }

      return res.send({
        status: 200,
        message: null,
        data,
        pages,
        page: req.query?.page,
      });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async buyerPostPut(req, res) {
    try {
      const { name, price, capacity, capacityMeasure, type, description } =
        req.body;

      const findedPost = await buyerPostModel.findById(req.params.id);

      if (!findedPost) {
        throw new Error('bunday post mavjud emas');
      }

      if (
        (name || price || capacity || capacityMeasure || type || description) &&
        toString(req.user._id) == toString(findedPost.user_ref_id)
      ) {
        const newPost = await buyerPostModel.findByIdAndUpdate(req.params.id, {
          name: name ? name : findedPost.name,
          price: price ? price : findedPost.price,
          capacity: capacity ? capacity : findedPost.capacity,
          capacityMeasure: capacityMeasure
            ? capacityMeasure
            : findedPost.capacityMeasure,
          type: type ? type : findedPost.type,
          description: description ? description : findedPost.description,
        });

        return res.send({
          status: 200,
          message: null,
          data: newPost,
        });
      }
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async buyerPostDelete(req, res) {
    try {
      const findedPost = await buyerPostModel.findById(req.params.id);

      if (!findedPost) {
        throw new Error('buday post mavjud emas!!!');
      }

      if (toString(req.user._id) == toString(findedPost.user_ref_id)) {
        const deletedItem = await buyerPostModel.findByIdAndDelete(
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
  async myPosts(req, res) {
    try {
      let data = [];
      data = await buyerPostModel
        .find({ user_ref_id: req.user._id })
        .skip((req.query?.page - 1) * 10)
        .limit(10);

      return res.send({ status: 200, message: null, data });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async buyerPostGetByUserId(req, res) {
    try {
      let data = [];
      const { id } = req.params;
      data = await buyerPostModel.find({ user_ref_id: id });

      return res.send({ status: 200, message: null, data });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
