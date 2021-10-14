import { createContext, useContext, useEffect, useState } from "react";

const CycleContext = createContext(undefined);

export function CycleProvider({ lskey, initialData, children }) {
  const [tasks, setTasks] = useState(() => {
    const storedValue = window.localStorage.getItem(lskey);
    return storedValue !== null ? JSON.parse(storedValue) : initialData;
  });

  const add = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...task,
        id: prevTasks.length > 0 ? prevTasks[prevTasks.length - 1]?.id + 1 : 1,
      },
    ]);
  };

  const edit = (newTask) => {
    setTasks((prevTasks) =>
      newTask.content === ""
        ? prevTasks.filter((task) => task.id !== newTask.id)
        : prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
    );
  };

  const remove = (taskToRemove) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToRemove.id)
    );
  };

  useEffect(() => {
    localStorage.setItem(lskey, JSON.stringify(tasks));
  }, [lskey, tasks]);

  return (
    <CycleContext.Provider value={[tasks, { add, edit, remove }]}>
      {children}
    </CycleContext.Provider>
  );
}

export function useCycle() {
  const context = useContext(CycleContext);
  if (context === undefined) {
    throw new Error("useCycle must be within a CycleProvider");
  }
  console.log(context);
  return context;
}
