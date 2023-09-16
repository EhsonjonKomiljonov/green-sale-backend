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

      const deletedComment = await commentModel.findByIdAndDelete(id);

      console.log(deletedComment);

      if (!deletedComment) {
        return res.status(404).send({
          status: 404,
          message: 'Comment not found',
          data: null,
        });
      }

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
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
