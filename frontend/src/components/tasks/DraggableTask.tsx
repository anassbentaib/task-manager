import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/task";
import TaskCard from "./TaskCard";
import { Category } from "../../types/category";

interface DraggableTaskProps {
  task: Task;
  index: number;
  categories: Category[];
  onDelete: (id: string) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({
  task,
  index,
  categories,
  onDelete,
}) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 p-4 rounded shadow bg-white ${
            snapshot.isDragging ? "bg-gray-100 opacity-80" : ""
          }`}
        >
          <TaskCard task={task} categories={categories} onDelete={onDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask;
