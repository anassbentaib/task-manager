import api from "./index";
import { Task, CreateTaskDto, UpdateTaskDto } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (
  id: string,
  task: UpdateTaskDto
): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const updateTaskPriority = async (
  id: string,
  priority: number
): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}/priority`, { priority });
  return response.data;
};
