import React, { useState } from "react";
import { useDrop } from "react-dnd";

import { Task } from "./components/Task/Task";
import taskStyles from "./components/Task/Task.module.css";

import { ItemTypes } from "./constants";

import styles from "./TaskContainer.module.css";

export function TaskContainer({
  title,
  tasks,
  color,
  onAddTask,
  onEditTask,
  onRemoveTask,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => onAddTask({ content: item.data.content }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const isEmpty = tasks.length === 0;

  const highlight = !isEmpty && (isDragging || isOver);

  return (
    <div
      className={styles.taskContainer}
      style={{ backgroundColor: highlight ? color : undefined }}
      ref={drop}
    >
      {tasks.map((task) => (
        <Task
          key={`${title}-${task.id}`}
          onEdit={onEditTask}
          onIsDragging={(isDragging) => setIsDragging(isDragging)}
          onRemoveTask={onRemoveTask}
          {...task}
        />
      ))}
      {isEmpty && (
        <div
          className={taskStyles.task}
          style={{ backgroundColor: "transparent", cursor: "default" }}
        >
          There are no tasks
        </div>
      )}
    </div>
  );
}
