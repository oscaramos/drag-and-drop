import React from 'react'
import styles from './App.module.css'
import CycleCard from './CycleCard'
import useCycle from './useCycle'

export default function App() {
  const [backlog, { add: addToBacklog, edit: editToBacklog }] = useCycle()
  const [inProgress, { add: addToInProgress, edit: editToInProgress }] = useCycle()
  const [complete, { add: addToComplete, edit: editToComplete }] = useCycle()
  const [onHold, { add: addToOnHold, edit: editToOnHold }] = useCycle()

  return (
    <div className={ styles.app }>
      <h1 className={ styles.title }>Kaban Board</h1>
      <div className={ styles.cycleCardsContainer }>
        <CycleCard
          title='Backlog'
          titleBackgroundColor='#A2622D'
          tasks={ backlog.tasks }
          onAddTask={ (task) => addToBacklog(task) }
          onEditTask={ (newTask) => editToBacklog(newTask) }
        />
        <CycleCard
          title='In Progress'
          titleBackgroundColor='#1B6161'
          tasks={ inProgress.tasks }
          onAddTask={ (task) => addToInProgress(task) }
          onEditTask={ (newTask) => editToInProgress(newTask) }
        />
        <CycleCard
          title='Complete'
          titleBackgroundColor='#248224'
          tasks={ complete.tasks }
          onAddTask={ (task) => addToComplete(task) }
          onEditTask={ (newTask) => editToComplete(newTask) }
        />
        <CycleCard
          title='On Hold'
          titleBackgroundColor='#A22D22'
          tasks={ onHold.tasks }
          onAddTask={ (task) => addToOnHold(task) }
          onEditTask={ (newTask) => editToOnHold(newTask) }
        />
      </div>
    </div>
  )
}
