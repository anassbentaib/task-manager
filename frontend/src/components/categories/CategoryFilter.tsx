import React from "react";
import { Category } from "../../types/category";
import CategoryBadge from "./CategoryBadge";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`w-full text-left px-3 py-2 rounded-md ${
          selectedCategory === null
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100"
        }`}
      >
        All Categories
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
            selectedCategory === category.id
              ? "bg-blue-100"
              : "hover:bg-gray-100"
          }`}
        >
          <CategoryBadge category={category} className="mr-2" />
        </button>
      ))}

      {categories.length === 0 && (
        <p className="text-sm text-gray-500 px-3 py-2">
          No categories available
        </p>
      )}
    </div>
  );
};

export default CategoryFilter;
