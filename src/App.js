import React from "react";

import TrashCan from "./components/TrashCan/TrashCan";
import CycleCard from "./components/CycleCard/CycleCard";

import styles from "./App.module.css";
import { cycles } from "./Cycles";

export default function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Kanban Board</h1>
      <div className={styles.cycleCardsContainer}>
        {cycles.map((cycle) => (
          <CycleCard
            key={cycle.title}
            title={cycle.title}
            color={cycle.color}
            initialData={cycle.defaultItems}
          />
        ))}
      </div>
      <TrashCan />
    </div>
  );
}
