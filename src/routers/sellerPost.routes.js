import { Router } from 'express';
import { sellerPostContr } from '../controllers/sellerPost.contr.js';
import { checkToken } from '../middlewares/user.token.check.js';
import { upload } from '../utils/multer.js';
export const sellerPostRouter = Router();

const sellerPost = new sellerPostContr();

sellerPostRouter
  .post('/', checkToken, upload.array('imgLink', 5), sellerPost.sellerPostAdd)
  .put('/:id', checkToken, upload.array('imgLink', 5), sellerPost.sellerPostPut)
  .delete('/:id', checkToken, sellerPost.sellerPostDelete)
  .get('/m', sellerPost.sellerPostGet)
  .get('/my-posts', checkToken, sellerPost.myPosts)
  .get('/get-posts', sellerPost.sellerPostGetPosts)
  .get('/:id', sellerPost.sellerPostGetId);
