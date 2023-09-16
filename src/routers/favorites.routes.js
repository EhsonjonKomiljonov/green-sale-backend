import { Router } from 'express';
import { favoritesContr } from '../controllers/favorites.contr.js';
import { checkToken } from '../middlewares/user.token.check.js';
export const favoritesRouter = Router();

const favorites = new favoritesContr();

favoritesRouter
  .get('/', checkToken, favorites.getFavorites)
  .post('/', checkToken, favorites.addFavorite)
  .delete('/:id', checkToken, favorites.deleteFavorite);
