import React from "react";
import { Link } from "react-router-dom";
import { Task } from "../../types/task";
import { Category } from "../../types/category";
import CategoryBadge from "../categories/CategoryBadge";

interface TaskCardProps {
  task: Task;
  categories: Category[];
  onDelete: (id: string) => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  categories,
  onDelete,
  className = "",
}) => {
  const category = categories.find((c) => c.id === task.category_id);

  const statusClasses = {
    todo: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };

  return (
    <div
      className={`task-card bg-white p-4 rounded-lg shadow border border-gray-200 ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
        <Link
          to={`/task/${task.id}`}
          className="text-lg font-medium text-blue-600 hover:underline"
        >
          {task.title}
        </Link>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            statusClasses[task.status]
          }`}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {category && <CategoryBadge category={category} />}
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/task/${task.id}`}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
