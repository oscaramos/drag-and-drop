import { useDrag } from "react-dnd";
import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

import styles from "./Task.module.css";

import { ItemTypes } from "../../constants";
import { useCycle } from "../../../../../../hooks/useCycle";

export function Task({ id, title, content, onIsDragging, canEditItems }) {
  const internalContent = useRef(content);
  const [, { edit, remove }] = useCycle();

  const [{ isDragging, didDropped }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: {
        data: { id, title, content: internalContent.current },
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const dropStatus = monitor.getDropResult()?.status;
        if (dropStatus === "translated" || dropStatus === "removed") {
          remove({ id });
        }
      },
    }),
    []
  );

  const handleChange = (event) => {
    internalContent.current = event.target.value;
    edit({ id, content: internalContent.current });
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
      disabled={!canEditItems}
      onChange={handleChange}
      innerRef={drag}
    />
  );
}
