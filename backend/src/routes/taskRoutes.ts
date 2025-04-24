import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskPriority,
} from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.use(protect as any);

router
  .route("/")
  .get(getTasks as any)
  .post(createTask as any);

router
  .route("/:id")
  .get(getTaskById as any)
  .put(updateTask as any)
  .delete(deleteTask as any);

router.patch("/:id/priority", updateTaskPriority as any);

export default router;
