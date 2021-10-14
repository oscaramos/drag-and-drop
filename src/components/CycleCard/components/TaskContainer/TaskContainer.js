import React, { useState } from "react";
import { useDrop } from "react-dnd";

import { Task } from "./components/Task/Task";
import taskStyles from "./components/Task/Task.module.css";

import { ItemTypes } from "./constants";

import styles from "./TaskContainer.module.css";

import { useCycle } from "../../../../hooks/useCycle";

export function TaskContainer({ title, color, canEditItems }) {
  const [tasks, { add }] = useCycle();

  const [isDragging, setIsDragging] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      const { content, title: itemTitle } = item.data;
      if (title === itemTitle) {
        return;
      }
      add({ content });
      return {
        status: "translated",
      };
    },
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
          title={title}
          onIsDragging={(isDragging) => setIsDragging(isDragging)}
          canEditItems={canEditItems}
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
