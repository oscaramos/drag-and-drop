import React from 'react';
import styles from './App.module.css'
import CycleCard from './CycleCard'

const tasks = [
  'Release the course 1',
  'Release the course 2',
  'Release the course 3',
]

export default function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Kaban Board</h1>
      <div className={styles.cycleCardsContainer}>
        <CycleCard title='Backlog' titleBackgroundColor='#A2622D' tasks={tasks} />
        <CycleCard title='In Progress' titleBackgroundColor='#1B6161' tasks={tasks} />
        <CycleCard title='Complete' titleBackgroundColor='#248224' tasks={tasks} />
        <CycleCard title='On Hold' titleBackgroundColor='#A22D22' tasks={tasks} />
      </div>
    </div>
  );
}
