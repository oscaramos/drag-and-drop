import React from "react";
import { useDrop } from "react-dnd";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ItemTypes } from "../CycleCard/components/TaskContainer/constants";

import useCycle from "../../hooks/useCycle";

import { cycles } from "../../Cycles";

import styles from "./TrashCan.module.css";

export default function TrashCan() {
  const [, { remove: remove0 }] = useCycle(cycles[0].title);
  const [, { remove: remove1 }] = useCycle(cycles[1].title);
  const [, { remove: remove2 }] = useCycle(cycles[2].title);
  const [, { remove: remove3 }] = useCycle(cycles[3].title);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop({ data: { id, title } }) {
      const removeItem = {
        [cycles[0].title]: () => remove0({ id }),
        [cycles[1].title]: () => remove1({ id }),
        [cycles[2].title]: () => remove2({ id }),
        [cycles[3].title]: () => remove3({ id }),
      };

      removeItem[title]();
    },
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
