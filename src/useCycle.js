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
    setTasks(prevTasks => [...prevTasks, task])
  }

  const edit = (newTask) => {
    setTasks(
      prevTasks =>
        prevTasks.map(task => task.id === newTask.id
          ? newTask
          : task)
    )
  }

  const data = {
    tasks,
  }

  return [data, { add, edit }]
}
