import React from "react";
import { useDrop } from "react-dnd";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ItemTypes } from "../CycleCard/components/TaskContainer/constants";

import styles from "./TrashCan.module.css";

export default function TrashCan() {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop: () => ({
      status: "removed",
    }),
  });

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: isOver ? "red" : undefined }}
      ref={drop}
    >
      <FontAwesomeIcon
        icon={faTrashAlt}
        color="white"
        style={{ fontSize: 24 }}
      />
    </div>
  );
}
