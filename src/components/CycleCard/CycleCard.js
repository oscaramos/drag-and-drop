import React, { useState } from "react";

import { AddTask } from "./components/AddTask/AddTask";
import { TaskContainer } from "./components/TaskContainer/TaskContainer";

import styles from "./CycleCard.module.css";

import { CycleProvider } from "../../hooks/useCycle";

export default function CycleCard({ title, initialData, color }) {
  const [status, setStatus] = useState("idle");

  const [canEditItems, setCanEditItems] = useState(false);

  const handleAdd = () => {
    setStatus("adding");
  };

  const handleToggleEdit = () => {
    setCanEditItems((canEdit) => !canEdit);
  };

  return (
    <CycleProvider lskey={title} initialData={initialData}>
      <div className={styles.container}>
        <h2 className={styles.title} style={{ backgroundColor: color }}>
          {title}
        </h2>

        <TaskContainer
          title={title}
          color={color}
          canEditItems={canEditItems}
        />

        <div className={styles.operationsContainer}>
          {status === "idle" && (
            <div className={styles.operationsButtonsContainerIdle}>
              <div className={styles.operationButton} onClick={handleAdd}>
                ➕ Add item
              </div>
              <div
                className={styles.operationButton}
                onClick={handleToggleEdit}
              >
                {canEditItems ? "🖉 Disable Edit" : "🖉 Enable Edit"}
              </div>
            </div>
          )}
          {status === "adding" && <AddTask setStatus={setStatus} />}
        </div>
      </div>
    </CycleProvider>
  );
}
