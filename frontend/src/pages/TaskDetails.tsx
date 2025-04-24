import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../api/tasks";
import { Task, UpdateTaskDto } from "../types/task";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/tasks/TaskForm";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { editTask, removeTask } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch task details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (updatedTask: UpdateTaskDto) => {
    if (!id) return;

    try {
      await editTask(id, updatedTask);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update task");
      }
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await removeTask(id);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete task");
      }
    }
  };

  if (loading) {
    return <Loader className="py-10" size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error} className="my-4" />;
  }

  if (!task) {
    return <ErrorMessage message="Task not found" className="my-4" />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => navigate("/")}>
            Back to Dashboard
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Task
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <TaskForm
          task={task}
          onSubmit={handleUpdate}
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default TaskDetails;
