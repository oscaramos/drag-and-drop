import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useDrag, useDrop } from "react-dnd";

import styles from "./CycleCard.module.css";

const ItemTypes = {
  TASK: "task",
};

function AddItemInput({ value, onChange }) {
  return (
    <div className={styles.addItemContainer}>
      <ContentEditable
        tagName="div"
        className={styles.addItemInnerContainer}
        html={value.current}
        disabled={false}
        onChange={onChange}
      />
    </div>
  );
}

function Task({ id, content, onEdit, onIsDragging, onRemoveTask }) {
  const internalContent = useRef(content);

  const [{ isDragging, didDropped }, drag] = useDrag({
    item: {
      type: ItemTypes.TASK,
      data: { content: internalContent.current },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end(item, monitor) {
      if (monitor.didDrop()) {
        onRemoveTask({ id });
      }
    },
  });

  const handleChange = (event) => {
    internalContent.current = event.target.value;
  };

  const handleBlur = () => {
    onEdit({ id, content: internalContent.current });
  };

  useEffect(() => {
    onIsDragging(isDragging);
  }, [onIsDragging, isDragging]);

  return (
    <ContentEditable
      tagName="div"
      style={{ backgroundColor: didDropped ? "red" : undefined }}
      className={styles.task}
      html={internalContent.current}
      disabled={false}
      onChange={handleChange}
      onBlur={handleBlur}
      innerRef={drag}
    />
  );
}

function TaskContainer({
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
          className={styles.task}
          style={{ backgroundColor: "transparent", cursor: "default" }}
        >
          There are no tasks
        </div>
      )}
    </div>
  );
}

export default function CycleCard({
  title,
  color,
  tasks,
  onAddTask,
  onEditTask,
  onRemoveTask,
}) {
  const [status, setStatus] = useState("idle");
  const addItemText = useRef("");

  const handleAdd = () => {
    setStatus("adding");
  };

  const handleSave = () => {
    setStatus("idle");

    const content = addItemText.current;
    addItemText.current = "";
    if (content === "") return;
    onAddTask({ content });
  };

  const handleCancel = () => {
    setStatus("idle");
  };

  const handleChange = (event) => {
    addItemText.current = event.target.value;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ backgroundColor: color }}>
        {title}
      </h2>

      <TaskContainer
        title={title}
        tasks={tasks}
        onAddTask={onAddTask}
        onEditTask={onEditTask}
        onRemoveTask={onRemoveTask}
        color={color}
      />

      <div className={styles.operationsContainer}>
        {status === "idle" && (
          <div className={styles.addOperation} onClick={handleAdd}>
            ➕ Add item
          </div>
        )}
        {status === "adding" && (
          <>
            <div className={styles.operationsButtonsContainer}>
              <div className={styles.cancelOperation} onClick={handleCancel}>
                Cancel
              </div>
              <div className={styles.saveOperation} onClick={handleSave}>
                Save item
              </div>
            </div>
            <AddItemInput value={addItemText} onChange={handleChange} />
          </>
        )}
      </div>
    </div>
  );
}
