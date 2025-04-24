import React, { useState, useEffect } from "react";
import { useTasks } from "../hooks/useTasks"; 
import { Category } from "../types/category";
import { createCategory } from "../api/categories";

const CategoriesPage: React.FC = () => {
  const { categories, fetchCategories } = useTasks();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return setError("Category name is required");

    setLoading(true);
    setError(null);
    try {
      await createCategory({ name, color });
      setName("");
      setColor("#000000");
      fetchCategories(); 
    } catch (err: any) {
      setError(err.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <form onSubmit={handleAddCategory} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-10 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <ul className="space-y-2">
        {categories.map((cat: Category) => (
          <li key={cat.id} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: cat.color }}
            ></span>
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
