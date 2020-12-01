import { useState } from 'react'


export default function useCycle() {
  const [tasks, setTasks] = useState([
    {
      content: "Release the course 1"
    },
    {
      content: "Release the course 2"
    },
    {
      content: "Release the course 3"
    },
  ])

  const data = {
    tasks,
  }

  const add = (task) => {
    setTasks([...tasks, task])
  }

  return [data, { add }]
}
