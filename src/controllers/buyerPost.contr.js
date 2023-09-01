import { buyerPostModel } from '../models/buyerPost.model.js';

export class buyerPostContr {
  async buyerPostAdd(req, res) {
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
      console.log(
        categoryId,
        name,
        price,
        capacity,
        capacityMeasure,
        type,
        region,
        district,
        description,
        contact
      );
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
      const data = await buyerPostModel.find();
      console.log(data);
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
