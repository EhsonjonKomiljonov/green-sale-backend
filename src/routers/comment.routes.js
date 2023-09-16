import { Router } from 'express';
import { commentContr } from '../controllers/comment.contr.js';
import { checkToken } from '../middlewares/user.token.check.js';
export const commentRouter = Router();

const comment = new commentContr();

commentRouter
  .post('/', checkToken, comment.addComment)
  .delete('/:id', checkToken, comment.deleteComment)
  .put('/:id', checkToken, comment.editComment);
