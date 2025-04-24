import React, { useState } from "react";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";
import { CreateTaskDto } from "../types/task";
import { useTasks } from "../hooks/useTasks";

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = async (task: CreateTaskDto) => {
    await addTask(task);
    setShowForm(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Sidebar className="md:col-span-1" />

      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Tasks</h1>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Close Form" : "Add Task"}
            </Button>
            <Button onClick={() => window.open("/categories", "_self")}>
              Add Category
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
            <TaskForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
