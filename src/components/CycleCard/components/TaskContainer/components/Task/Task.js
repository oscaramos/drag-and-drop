import { useDrag } from "react-dnd";
import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

import styles from "./Task.module.css";

import { ItemTypes } from "../../constants";

export function Task({ id, title, content, onEdit, onIsDragging }) {
  const internalContent = useRef(content);

  const [{ isDragging, didDropped }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: {
        data: { id, title, content: internalContent.current },
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const handleChange = (event) => {
    internalContent.current = event.target.value;
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
      disabled={true}
      onChange={handleChange}
      innerRef={drag}
    />
  );
}
