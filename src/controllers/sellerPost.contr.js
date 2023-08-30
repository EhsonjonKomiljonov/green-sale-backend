import { sellerPostModel } from '../models/sellerPost.model.js';

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
      const { filename } = req.file;
      if (
        categoryId &&
        filename &&
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
        const newPost = await sellerPostModel.create({
          category_ref_id: categoryId,
          name,
          price,
          capacity,
          capacityMeasure,
          type,
          region,
          district,
          description,
          contact,
          imgLink: '/' + filename,
        });

        return res.send({
          status: 200,
          message: null,
          data: newPost,
        });
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
      const data = await sellerPostModel.find();
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
