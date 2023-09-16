import { buyerPostModel } from '../models/buyerPost.model.js';
import { favoriteModel } from '../models/favorites.model.js';
import { sellerPostModel } from '../models/sellerPost.model.js';

export class favoritesContr {
  async addFavorite(req, res) {
    try {
      const { product_ref_id } = req.body;
      if (product_ref_id) {
        const newFavorite = await favoriteModel.create({
          user_ref_id: req.user._id,
          product_ref_id,
        });
        const productUpdFavSell = await sellerPostModel.findByIdAndUpdate(
          {
            _id: product_ref_id,
          },
          { favorite: true }
        );
        const productUpdFavBuy = await buyerPostModel.findByIdAndUpdate(
          {
            _id: product_ref_id,
          },
          { favorite: true }
        );
        console.log(productUpdFavSell);
        console.log(productUpdFavBuy);
        return res.send({
          status: 200,
          message: null,
          data: newFavorite,
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
  async deleteFavorite(req, res) {
    try {
      const { id } = req.params;

      await favoriteModel.findOneAndDelete({
        user_ref_id: req.user._id,
        product_ref_id: id,
      });
      const buyerRemove = await buyerPostModel.findByIdAndUpdate(
        { _id: id },
        {
          favorite: false,
        }
      );

      const sellerRemove = await sellerPostModel.findByIdAndUpdate(
        { _id: id },
        {
          favorite: false,
        }
      );
      console.log(buyerRemove);
      console.log(sellerRemove);

      return res.send({
        status: 200,
        message: 'Favorite deleted',
        data: true,
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
