import React, { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

import { TaskContainer } from "./components/TaskContainer/TaskContainer";

import styles from "./CycleCard.module.css";

import useCycle from "../../hooks/useCycle";

export default function CycleCard({ title, initialData, color }) {
  const [status, setStatus] = useState("idle");
  const addItemText = useRef("");

  const [canEditItems, setCanEditItems] = useState(false);

  const [, { add }] = useCycle(title, initialData);

  const handleAdd = () => {
    setStatus("adding");
  };

  const handleToggleEdit = () => {
    setCanEditItems((canEdit) => !canEdit);
  };

  const handleSave = () => {
    setStatus("idle");

    const content = addItemText.current;
    addItemText.current = "";
    if (content === "") return;
    add({ content });
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

      <TaskContainer title={title} color={color} canEditItems={canEditItems} />

      <div className={styles.operationsContainer}>
        {status === "idle" && (
          <div className={styles.operationsButtonsContainerIdle}>
            <div className={styles.operationButton} onClick={handleAdd}>
              ➕ Add item
            </div>
            <div className={styles.operationButton} onClick={handleToggleEdit}>
              {canEditItems ? "🖉 Disable Edit" : "🖉 Enable Edit"}
            </div>
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
