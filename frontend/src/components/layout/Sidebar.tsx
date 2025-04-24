import React from "react";
import { useTasks } from "../../hooks/useTasks";
import CategoryFilter from "../categories/CategoryFilter";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const {
    categories,
    setSelectedCategory,
    selectedCategory,
    statusFilter,
    setStatusFilter,
  } = useTasks();

  return (
    <aside className={`p-4 bg-white rounded-lg shadow ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
        <div className="space-y-2">
          <button
            onClick={() => setStatusFilter(null)}
            className={`w-full text-left px-3 py-2 rounded-md ${
              statusFilter === null
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("todo")}
            className={`w-full text-left px-3 py-2 rounded-md ${
              statusFilter === "todo"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            To Do
          </button>
          <button
            onClick={() => setStatusFilter("in_progress")}
            className={`w-full text-left px-3 py-2 rounded-md ${
              statusFilter === "in_progress"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter("done")}
            className={`w-full text-left px-3 py-2 rounded-md ${
              statusFilter === "done"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Done
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
