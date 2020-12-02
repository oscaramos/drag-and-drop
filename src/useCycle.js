import { useLocalStorage } from "react-use-storage"


export default function useCycle(key, initialData) {
  const [tasks, setTasks] = useLocalStorage(key, initialData)

  const add = (task) => {
    setTasks(
      [
        ...tasks,
        {
          ...task,
          id: tasks.length>0
            ? tasks[tasks.length-1]?.id + 1
            : 1
        }
      ]
    )
  }

  const edit = (newTask) => {
    // If empty content then Remove item
    // Otherwise then Edit the item
    const newTasks =
      newTask.content === ''
        ? tasks.filter(task => task.id !== newTask.id)
        : tasks.map(task => task.id === newTask.id
          ? newTask
          : task
        )

    setTasks(newTasks)
  }

  const remove = (taskToRemove) => {
    setTasks(
      tasks.filter(task => task.id !== taskToRemove.id)
    )
  }

  const data = {
    tasks,
  }

  return [data, { add, edit, remove }]
}
