import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskPriority,
} from "../api/tasks";
import { getCategories } from "../api/categories";
import { Task, CreateTaskDto, UpdateTaskDto } from "../types/task";
import { Category } from "../types/category";
import { useAuth } from "../hooks/useAuth";

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: CreateTaskDto) => Promise<void>;
  editTask: (id: string, task: UpdateTaskDto) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  updatePriority: (id: string, priority: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
}

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType
);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch categories");
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: CreateTaskDto) => {
    setLoading(true);
    setError(null);

    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create task");
      }
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: string, task: UpdateTaskDto) => {
    setLoading(true);
    setError(null);

    try {
      const updatedTask = await updateTask(id, task);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update task");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete task");
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePriority = async (id: string, priority: number) => {
    setLoading(true);
    setError(null);

    try {
      const updatedTask = await updateTaskPriority(id, priority);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update task priority");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    console.log("called");

    fetchTasks();
    fetchCategories();
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        loading,
        error,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
        updatePriority,
        fetchCategories,
        selectedCategory,
        setSelectedCategory,
        statusFilter,
        setStatusFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
