import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect as any);

router.route('/')
  .get(getCategories as any)
  .post(createCategory as any);

router.route('/:id')
  .get(getCategoryById as any)
  .put(updateCategory as any)
  .delete(deleteCategory as any);

export default router;