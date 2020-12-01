import React, { useRef, useState } from 'react'
import styles from './CycleCard.module.css'
import ContentEditable from 'react-contenteditable'

function Task({ id, content, onEdit }) {
  const internalContent = useRef(content)

  const handleChange = (event) => {
    internalContent.current = event.target.value
  }

  const handleBlur = () => {
    onEdit({ id, content: internalContent.current })
  }

  return (
    <ContentEditable
      tagName="div"
      className={ styles.task }
      html={ String(content) }
      disabled={false}
      onChange={handleChange}
      onBlur={handleBlur}
    />
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
          tasks.map(task => <Task key={`${ title }-${ task.id }`} onEdit={onEditTask} {...task} />)
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
