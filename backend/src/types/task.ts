export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: number;
  category_id: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  category_id?: string | null;
  user_id: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: "todo" | "in_progress" | "done";
  priority?: number;
  category_id?: string | null;
}
