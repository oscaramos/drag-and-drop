import React, { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

import { TaskContainer } from "./components/TaskContainer/TaskContainer";

import styles from "./CycleCard.module.css";

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
            <div className={styles.addItemContainer}>
              <ContentEditable
                tagName="div"
                className={styles.addItemInnerContainer}
                html={addItemText.current}
                disabled={false}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
