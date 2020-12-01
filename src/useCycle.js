import { useState } from 'react'


export default function useCycle() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      content: 'Release the course 1',
    },
    {
      id: 2,
      content: 'Release the course 2',
    },
    {
      id: 3,
      content: 'Release the course 3',
    },
  ])

  const add = (task) => {
    setTasks(prevTasks => [...prevTasks, { ...task, id: prevTasks[prevTasks.length-1].id+1 }])
  }

  const edit = (newTask) => {
    setTasks(
      prevTasks => {
        // If empty content then Remove item
        if (newTask.content === '') {
          return prevTasks.filter(task => task.id !== newTask.id)
        } else {
          // Otherwise then Edit the item
          return prevTasks.map(task => task.id === newTask.id
            ? newTask
            : task)
        }
      }
    )
  }

  const data = {
    tasks,
  }

  return [data, { add, edit }]
}
