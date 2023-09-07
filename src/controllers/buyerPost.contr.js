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
        price &&
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
          price,
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
      let data = [];
      data = await buyerPostModel.find();
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
  async buyerPostPut(req, res) {
    try {
      const {
        name,
        price,
        capacity,
        capacityMeasure,
        type,
        description,
        contact,
      } = req.body;

      const findedPost = await buyerPostModel.findById(req.params.id);

      if (!findedPost) {
        throw new Error('bunday post mavjud emas');
      }

      if (
        (name ||
          price ||
          capacity ||
          capacityMeasure ||
          type ||
          description ||
          contact) &&
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
          contact: contact ? contact : findedPost.contact,
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
}
