import React from "react";
import { Category } from "../../types/category";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ backgroundColor: `${category.color}20`, color: category.color }}
    >
      {category.name}
    </span>
  );
};

export default CategoryBadge;
