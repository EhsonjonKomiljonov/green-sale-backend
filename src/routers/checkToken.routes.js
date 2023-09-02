import { Router } from 'express';
import { ApiCheckToken } from '../controllers/api.check.token.js';

export const checkTokenRouter = Router();
const checkToken = new ApiCheckToken();

checkTokenRouter.get('/', checkToken.apiCheckToken);
