import { Router } from 'express';
import { favoritesContr } from '../controllers/favorites.contr.js';
import { checkToken } from '../middlewares/user.token.check.js';
export const favoritesRouter = Router();

const favorites = new favoritesContr();

favoritesRouter
  .post('/', checkToken, favorites.addFavorite)
  .delete('/:id', checkToken, favorites.deleteFavorite);
