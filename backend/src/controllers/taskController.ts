import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TaskModel } from "../models/Task";
import { CreateTaskDto, UpdateTaskDto } from "../types/task";

export const getTasks = async (req: Request, res: Response) => {
  const { user } = req as any;

  try {
    const tasks = await TaskModel.findAll(user.id);

    return res.status(StatusCodes.OK).json(tasks);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as any;

  try {
    const task = await TaskModel.findById(id, user.id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(StatusCodes.OK).json(task);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { user } = req as any;
  const taskData: CreateTaskDto = {
    ...req.body,
    user_id: user.id,
  };

  try {
    const task = await TaskModel.create(taskData);

    return res.status(StatusCodes.CREATED).json(task);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as any;
  const taskData: UpdateTaskDto = req.body;

  try {
    const task = await TaskModel.findById(id, user.id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await TaskModel.update(id, user.id, taskData);

    return res.status(StatusCodes.OK).json(updatedTask);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as any;

  try {
    const task = await TaskModel.findById(id, user.id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    await TaskModel.delete(id, user.id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTaskPriority = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { priority } = req.body;
  const { user } = req as any;

  try {
    const task = await TaskModel.findById(id, user.id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await TaskModel.updatePriority(id, user.id, priority);

    return res.status(StatusCodes.OK).json(updatedTask);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
