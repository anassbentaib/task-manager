import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryModel } from "../models/Category";
import { CreateCategoryDto, UpdateCategoryDto } from "../types/category";

export const getCategories = async (req: Request, res: Response) => {
  const { user } = req as any;
  console.log("🚀 ~ getCategories ~ user:", user)

  try {
    const categories = await CategoryModel.findAll(user.id);

    return res.status(StatusCodes.OK).json(categories);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as any;

  try {
    const category = await CategoryModel.findById(id, user.id);

    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(StatusCodes.OK).json(category);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { user } = req as any;
  const categoryData: CreateCategoryDto = {
    ...req.body,
    user_id: user.id,
  };

  try {
    const category = await CategoryModel.create(categoryData);

    return res.status(StatusCodes.CREATED).json(category);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as any;
  const categoryData: UpdateCategoryDto = req.body;

  try {
    const category = await CategoryModel.findById(id, user.id);

    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    const updatedCategory = await CategoryModel.update(
      id,
      user.id,
      categoryData
    );

    return res.status(StatusCodes.OK).json(updatedCategory);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req as any;

  try {
    const category = await CategoryModel.findById(id, user.id);

    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    await CategoryModel.delete(id, user.id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
