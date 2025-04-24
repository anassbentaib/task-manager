import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabase";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/category";

export class CategoryModel {
  static async findAll(userId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId)
      .order("name", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data || [];
  }

  static async findById(id: string, userId: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Category not found
      }
      throw new Error(`Failed to fetch category: ${error.message}`);
    }

    return data;
  }

  static async create(categoryData: CreateCategoryDto): Promise<Category> {
    const category = {
      id: uuidv4(),
      ...categoryData,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("categories")
      .insert(category)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }

    return data;
  }

  static async update(
    id: string,
    userId: string,
    categoryData: UpdateCategoryDto
  ): Promise<Category> {
    const { data, error } = await supabase
      .from("categories")
      .update(categoryData)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }

    return data;
  }

  static async delete(id: string, userId: string): Promise<void> {
    // First update all tasks with this category to have null category_id
    const { error: taskUpdateError } = await supabase
      .from("tasks")
      .update({ category_id: null })
      .eq("category_id", id)
      .eq("user_id", userId);

    if (taskUpdateError) {
      throw new Error(
        `Failed to update tasks with category: ${taskUpdateError.message}`
      );
    }

    // Then delete the category
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}
