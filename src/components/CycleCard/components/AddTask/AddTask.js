import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";

import { useCycle } from "../../../../hooks/useCycle";

import styles from "./AddTask.module.css";

export function AddTask({ setStatus }) {
  const addItemText = useRef("");

  const [, { add }] = useCycle();

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
  );
}
