import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useTasks } from "../../hooks/useTasks";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import DraggableTask from "./DraggableTask";

const TaskList: React.FC = () => {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    removeTask,
    updatePriority,
    categories,
    selectedCategory,
    statusFilter,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    console.log("is function called");

    console.log("Drag result:", result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      console.log("No destination");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Same position");
      return;
    }

    console.log("Updating priority", draggableId, destination.index);
    updatePriority(draggableId, destination.index);
  };
  const [isDragging, setIsDragging] = useState(false);

  const filteredTasks = tasks
    .filter(
      (task) => !selectedCategory || task.category_id === selectedCategory
    )
    .filter((task) => !statusFilter || task.status === statusFilter)
    .sort((a, b) => a.priority - b.priority);
  const stableFilteredTasks = useMemo(() => {
    if (isDragging) return tasks; // no filtering during drag
    return tasks
      .filter(
        (task) => !selectedCategory || task.category_id === selectedCategory
      )
      .filter((task) => !statusFilter || task.status === statusFilter)
      .sort((a, b) => a.priority - b.priority);
  }, [tasks, selectedCategory, statusFilter, isDragging]);

  if (loading) {
    return <Loader className="py-10" size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error} className="my-4" />;
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          No tasks found. Create a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <DragDropContext
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(result) => {
        setIsDragging(false);
        handleDragEnd(result);
      }}
    >
      <Droppable
        droppableId="tasks"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {stableFilteredTasks.map((task, index) => (
              <DraggableTask
                key={task.id.toString()}
                task={task}
                index={index}
                categories={categories}
                onDelete={removeTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
