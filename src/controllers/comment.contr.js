import { buyerPostModel } from '../models/buyerPost.model.js';
import { commentModel } from '../models/comments.model.js';
import { sellerPostModel } from '../models/sellerPost.model.js';

export class commentContr {
  async addComment(req, res) {
    try {
      const { text, product_ref_id } = req.body;
      if (text) {
        const newComment = await commentModel.create({
          text,
          user_ref_id: req.user._id,
          product_ref_id,
        });

        let updatedData = null;
        const findPostSell = await sellerPostModel.findById(product_ref_id);
        const findPostBuy = await buyerPostModel.findById(product_ref_id);

        if (findPostSell) {
          findPostSell.comments.push(newComment._id);
          updatedData = await findPostSell.save();
        } else if (findPostBuy) {
          findPostBuy.comments.push(newComment._id);
          updatedData = await await findPostBuy.save();
        }

        return res.status(200).send({
          status: 200,
          message: null,
          data: updatedData,
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

  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      const findedComment = await commentModel.findById(id);
      if (!findedComment) throw new Error('Bunday comment mavjud emas');

      if (toString(findedComment.user_ref_id) == toString(req.user._id)) {
        const deletedComment = await commentModel.findByIdAndDelete(id);

        await sellerPostModel.findByIdAndUpdate(deletedComment.product_ref_id, {
          $pull: { comments: id },
        });

        await buyerPostModel.findByIdAndUpdate(deletedComment.product_ref_id, {
          $pull: { comments: id },
        });

        return res.send({
          status: 200,
          message: 'Comment deleted',
          data: true,
        });
      } else throw new Error('Siz boshqalarni commentini ochira olmaysiz !');
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async editComment(req, res) {
    try {
      const { id } = req.params;
      const text = req.body?.text;
      const foundComment = await commentModel.findById(id);
      if (!foundComment) {
        throw new Error('Bunday comment mavjud emas');
      }

      if (foundComment.user_ref_id.toString() == req.user._id.toString()) {
        const updatedComment = await commentModel.findByIdAndUpdate(
          id,
          { text: text },
          { new: true }
        );

        if (!updatedComment) {
          throw new Error('Comment update failed');
        }

        return res.status(200).send({
          status: 200,
          message: 'Comment edited',
          data: updatedComment,
        });
      } else {
        throw new Error(
          'Siz boshqalarni commentni tahrir olishda ruxsat etilmaysiz!'
        );
      }
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
