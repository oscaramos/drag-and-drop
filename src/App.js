import React from "react";

import useCycle from "./hooks/useCycle";

import TrashCan from "./components/TrashCan/TrashCan";
import CycleCard from "./components/CycleCard/CycleCard";

import styles from "./App.module.css";

export default function App() {
  const [
    backlog,
    { add: addToBacklog, edit: editToBacklog, remove: removeToBacklog },
  ] = useCycle("backlog", [
    {
      id: 1,
      content: "Go shopping",
    },
    {
      id: 2,
      content: "Make the dinner",
    },
  ]);
  const [
    inProgress,
    {
      add: addToInProgress,
      edit: editToInProgress,
      remove: removeToInProgress,
    },
  ] = useCycle("In Progress", [
    {
      id: 1,
      content: "Working hard",
    },
    {
      id: 2,
      content: "Learning new things",
    },
  ]);
  const [
    complete,
    { add: addToComplete, edit: editToComplete, remove: removeToComplete },
  ] = useCycle("Complete", [
    {
      id: 1,
      content: "Created portfolio",
    },
    {
      id: 2,
      content: "Created some side projects",
    },
    {
      id: 3,
      content: "Got my first developer job",
    },
  ]);
  const [
    onHold,
    { add: addToOnHold, edit: editToOnHold, remove: removeToOnHold },
  ] = useCycle("On Hold", []);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Kaban Board</h1>
      <div className={styles.cycleCardsContainer}>
        <CycleCard
          title="Backlog"
          color="#A2622D"
          tasks={backlog.tasks}
          onAddTask={(task) => addToBacklog(task)}
          onEditTask={(newTask) => editToBacklog(newTask)}
          onRemoveTask={(taskToRemove) => removeToBacklog(taskToRemove)}
        />
        <CycleCard
          title="In Progress"
          color="#1B6161"
          tasks={inProgress.tasks}
          onAddTask={(task) => addToInProgress(task)}
          onEditTask={(newTask) => editToInProgress(newTask)}
          onRemoveTask={(taskToRemove) => removeToInProgress(taskToRemove)}
        />
        <CycleCard
          title="Complete"
          color="#248224"
          tasks={complete.tasks}
          onAddTask={(task) => addToComplete(task)}
          onEditTask={(newTask) => editToComplete(newTask)}
          onRemoveTask={(taskToRemove) => removeToComplete(taskToRemove)}
        />
        <CycleCard
          title="On Hold"
          color="#A22D22"
          tasks={onHold.tasks}
          onAddTask={(task) => addToOnHold(task)}
          onEditTask={(newTask) => editToOnHold(newTask)}
          onRemoveTask={(taskToRemove) => removeToOnHold(taskToRemove)}
        />
      </div>
      <TrashCan />
    </div>
  );
}
