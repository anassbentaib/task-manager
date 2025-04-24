import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export const useCategories = () => {
  const { categories, fetchCategories, loading, error } =
    useContext(TaskContext);

  return {
    categories,
    fetchCategories,
    loading,
    error,
  };
};
