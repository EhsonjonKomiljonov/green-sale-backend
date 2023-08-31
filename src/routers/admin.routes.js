import { Router } from 'express';
import { AdminContr } from '../controllers/admin.contr.js';
export const adminRouter = Router();

const admin = new AdminContr();

adminRouter
  .post('/login', admin.loginAdmin)
  .post('/add-category', admin.addCategory)
  .put('/edit-category/:id', admin.editCategory)
  .delete('/delete-category/:id', admin.deleteCategory)
  .delete('/delete-seller-post/:id', admin.deleteSellerPost) 
  .delete('/delete-buyer-post/:id', admin.deleteBuyerPost);
