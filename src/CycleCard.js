import React from 'react'
import styles from './CycleCard.module.css'

export default function CycleCard({ title, titleBackgroundColor, tasks }) {
  return (
    <div className={ styles.container }>
      <h2 className={ styles.title } style={{ backgroundColor: titleBackgroundColor }}>{ title }</h2>

      <div className={ styles.taskContainer }>
        {
          tasks.map(task => <div className={ styles.task }>{ task }</div>)
        }
      </div>

      <div className={ styles.operationsContainer }>
        <div className={ styles.operation }>➕ Add item</div>
      </div>
    </div>
  )
}
