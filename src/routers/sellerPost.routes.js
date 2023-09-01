import { Router } from 'express';
import { sellerPostContr } from '../controllers/sellerPost.contr.js';
import { checkToken } from '../middlewares/token.check.js';
import { upload } from '../utils/multer.js';
export const sellerPostRouter = Router();

const sellerPost = new sellerPostContr();

sellerPostRouter
  .post('/', checkToken, upload.array('imgLink'), sellerPost.sellerPostAdd)
  .put('/:id', checkToken, upload.array('imgLink'), sellerPost.sellerPostPut)
  .delete('/:id', checkToken, upload.array('imgLink'), sellerPost.sellerPostDelete)
  .get('/', sellerPost.sellerPostGet)
  .get('/:id', sellerPost.sellerPostGetId);
