import React, { useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import styles from './CycleCard.module.css'

function AddItemInput({ value, onChange }) {
  return (
    <div className={ styles.addItemContainer }>
      <ContentEditable
        tagName='div'
        className={ styles.addItemInnerContainer }
        html={ value.current }
        disabled={ false }
        onChange={ onChange }
      />
    </div>
  )
}

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
      tagName='div'
      className={ styles.task }
      html={ internalContent.current }
      disabled={ false }
      onChange={ handleChange }
      onBlur={ handleBlur }
    />
  )
}

export default function CycleCard({ title, titleBackgroundColor, tasks, onAddTask, onEditTask }) {
  const [status, setStatus] = useState('idle')
  const addItemText = useRef('')

  const handleAdd = () => {
    setStatus('adding')
  }

  const handleSave = () => {
    setStatus('idle')
    onAddTask({ content: addItemText.current })
    addItemText.current = ''
  }

  const handleChange = (event) => {
    addItemText.current = event.target.value
  }

  return (
    <div className={ styles.container }>
      <h2 className={ styles.title } style={ { backgroundColor: titleBackgroundColor } }>{ title }</h2>

      <div className={ styles.taskContainer }>
        {
          tasks.map(task => <Task key={ `${ title }-${ task.id }` } onEdit={ onEditTask } { ...task } />)
        }
      </div>

      <div className={ styles.operationsContainer }>
        {
          status === 'idle' &&
          <div className={ styles.addOperation } onClick={ handleAdd }>➕ Add item</div>
        }
        {
          status === 'adding' &&
          <>
            <div className={ styles.saveOperation } onClick={ handleSave }>Save item</div>
            <AddItemInput value={ addItemText } onChange={ handleChange } />
          </>
        }
      </div>
    </div>
  )
}
