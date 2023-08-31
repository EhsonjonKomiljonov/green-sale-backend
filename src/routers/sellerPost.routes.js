import { Router } from 'express';
import { sellerPostContr } from '../controllers/sellerPost.contr.js';
import { checkToken } from '../middlewares/user.token.check.js';
import { upload } from '../utils/multer.js';
export const sellerPostRouter = Router();

const sellerPost = new sellerPostContr();

sellerPostRouter
  .post('/', checkToken, upload.single('imgLink'), sellerPost.sellerPostAdd)
  .get('/', sellerPost.sellerPostGet);
