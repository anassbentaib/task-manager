import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabase";
import { Task, CreateTaskDto, UpdateTaskDto } from "../types/task";

export class TaskModel {
  static async findAll(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("priority", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return data || [];
  }

  static async findById(id: string, userId: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Task not found
      }
      throw new Error(`Failed to fetch task: ${error.message}`);
    }

    return data;
  }

  static async create(taskData: CreateTaskDto): Promise<Task> {
    const task = {
      id: uuidv4(),
      ...taskData,
      priority: await this.getNextPriority(taskData.user_id),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert(task)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }

    return data;
  }

  static async update(
    id: string,
    userId: string,
    taskData: UpdateTaskDto
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        ...taskData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }

    return data;
  }

  static async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  }

  static async updatePriority(
    id: string,
    userId: string,
    priority: number
  ): Promise<Task> {
    // First get the task to update
    const task = await this.findById(id, userId);
    if (!task) {
      throw new Error("Task not found");
    }

    // Tasks that need to be shifted down
    if (priority < task.priority) {
      await supabase.rpc("shift_tasks_down", {
        user_id_param: userId,
        min_priority_param: priority,
        max_priority_param: task.priority - 1,
      });
    }
    // Tasks that need to be shifted up
    else if (priority > task.priority) {
      await supabase.rpc("shift_tasks_up", {
        user_id_param: userId,
        min_priority_param: task.priority + 1,
        max_priority_param: priority,
      });
    }

    // Update the task's priority
    const { data, error } = await supabase
      .from("tasks")
      .update({
        priority,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update task priority: ${error.message}`);
    }

    return data;
  }

  private static async getNextPriority(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from("tasks")
      .select("priority")
      .eq("user_id", userId)
      .order("priority", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(`Failed to get next priority: ${error.message}`);
    }

    return data.length > 0 ? data[0].priority + 1 : 0;
  }
}
