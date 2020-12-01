import React from 'react'
import styles from './App.module.css'
import CycleCard from './CycleCard'
import useCycle from './useCycle'

export default function App() {
  const [backlog, { add: addToBacklog, edit: editToBacklog }] = useCycle()
  const [inProgress, { add: addToInProgress, edit: editToInProgress }] = useCycle()
  const [complete, { add: addToComplete, edit: editToComplete }] = useCycle()
  const [onHold, { add: addToOnHold, edit: editToOnHold }] = useCycle()

  const getOperation = (title, operation) => {
    switch (title) {
      case 'Backlog':
        switch (operation) {
          case 'add': return addToBacklog
          case 'edit': return editToBacklog
          default:
            throw new Error('Invalid operation')
        }
      case 'In Progress':
        switch (operation) {
          case 'add': return addToInProgress
          case 'edit': return editToInProgress
          default:
            throw new Error('Invalid operation')
        }
      case 'Complete':
        switch (operation) {
          case 'add': return addToComplete
          case 'edit': return editToComplete
          default:
            throw new Error('Invalid operation')
        }
      case 'On Hold':
        switch (operation) {
          case 'add': return addToOnHold
          case 'edit': return editToOnHold
          default:
            throw new Error('Invalid operation')
        }
      default:
        throw new Error('Invalid title')
    }
  }

  const handleAddTask = (title, task) => {
    getOperation(title, 'add')(task)
  }

  const handleEditTask = (title, newTask) => {
    getOperation(title, 'edit')(newTask)
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
          onEditTask={ handleEditTask }
        />
        <CycleCard
          title='In Progress'
          titleBackgroundColor='#1B6161'
          tasks={ inProgress.tasks }
          onAddTask={ handleAddTask }
          onEditTask={ handleEditTask }
        />
        <CycleCard
          title='Complete'
          titleBackgroundColor='#248224'
          tasks={ complete.tasks }
          onAddTask={ handleAddTask }
          onEditTask={ handleEditTask }
        />
        <CycleCard
          title='On Hold'
          titleBackgroundColor='#A22D22'
          tasks={ onHold.tasks }
          onAddTask={ handleAddTask }
          onEditTask={ handleEditTask }
        />
      </div>
    </div>
  )
}
