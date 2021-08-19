import { useDrag } from "react-dnd";
import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

import styles from "./Task.module.css";

import { ItemTypes } from "../../constants";

export function Task({ id, content, onEdit, onIsDragging, onRemoveTask }) {
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
