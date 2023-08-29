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
        description
      ) {
        const { filename } = req.file;

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
          imgLink: '/' + filename,
        });

        return res.send({
          status: 200,
          message: newPost,
          data: null,
        });
      } else throw new Error('Invalid Values !!!');
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async post(req, res) {}
  async login(req, res) {}
  async resetPassword(req, res) {}
}
