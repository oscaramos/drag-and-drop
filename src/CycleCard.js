import React, { useState } from 'react'
import styles from './CycleCard.module.css'

function Task({ id, content, onEdit }) {

  const handleEdit = () => {
    onEdit({ id, content: "ajajaja" })
  }

  return (
    <div className={ styles.task } onClick={handleEdit}>
      { content }
    </div>
  )
}

export default function CycleCard({ title, titleBackgroundColor, tasks, onAddTask, onEditTask }) {
  const [status, setStatus] = useState('idle')

  const handleAdd = () => {
    setStatus('adding')
  }

  const handleSave = () => {
    setStatus('idle')
    onAddTask({ content: "Title" })
  }

  return (
    <div className={ styles.container }>
      <h2 className={ styles.title } style={ { backgroundColor: titleBackgroundColor } }>{ title }</h2>

      <div className={ styles.taskContainer }>
        {
          tasks.map(task => <Task {...task} onEdit={onEditTask} />)
        }
      </div>

      <div className={ styles.operationsContainer }>
        {
          status === 'idle' &&
          <div className={ styles.addOperation } onClick={handleAdd}>➕ Add item</div>
        }
        {
          status === 'adding' &&
          <div className={ styles.saveOperation } onClick={handleSave}>Save item</div>
        }
      </div>
    </div>
  )
}
