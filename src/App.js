import React from 'react'
import styles from './App.module.css'
import CycleCard from './CycleCard'
import useCycle from './useCycle'

export default function App() {
  const [backlog, { add: addToBacklog }] = useCycle()
  const [inProgress, { add: addToInProgress }] = useCycle()
  const [complete, { add: addToComplete }] = useCycle()
  const [onHold, { add: addToOnHold }] = useCycle()

  const handleAddTask = (title, task) => {
    switch (title) {
      case 'Backlog':
        addToBacklog(task)
        break
      case 'In Progress':
        addToInProgress(task)
        break
      case 'Complete':
        addToComplete(task)
        break
      case 'On Hold':
        addToOnHold(task)
        break
      default:
        throw new Error('Invalid title')
    }
  }

  return (
    <div className={ styles.app }>
      <h1 className={ styles.title }>Kaban Board</h1>
      <div className={ styles.cycleCardsContainer }>
        <CycleCard
          title='Backlog'
          titleBackgroundColor='#A2622D'
          tasks={ backlog.tasks }
          onAddTask={ handleAddTask }
        />
        <CycleCard
          title='In Progress'
          titleBackgroundColor='#1B6161'
          tasks={ inProgress.tasks }
          onAddTask={ handleAddTask }
        />
        <CycleCard
          title='Complete'
          titleBackgroundColor='#248224'
          tasks={ complete.tasks }
          onAddTask={ handleAddTask }
        />
        <CycleCard
          title='On Hold'
          titleBackgroundColor='#A22D22'
          tasks={ onHold.tasks }
          onAddTask={ handleAddTask }
        />
      </div>
    </div>
  )
}
