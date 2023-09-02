import { Router } from 'express';
import { sellerPostContr } from '../controllers/sellerPost.contr.js';
import { checkToken } from '../middlewares/user.token.check.js';
import { upload } from '../utils/multer.js';
export const sellerPostRouter = Router();

const sellerPost = new sellerPostContr();

sellerPostRouter
  .post('/', checkToken, upload.array('imgLink'), sellerPost.sellerPostAdd)
  .put('/:id', checkToken, upload.array('imgLink'), sellerPost.sellerPostPut)
  .delete('/:id', checkToken, sellerPost.sellerPostDelete)
  .get('/', sellerPost.sellerPostGet)
  .get('/get-posts', sellerPost.sellerPostGetPosts)
  .get('/:id', sellerPost.sellerPostGetId);
