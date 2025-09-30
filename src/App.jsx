
import { useState } from 'react';
import './App.css'
import Board from './Board'
import CreateTask from './CreateTask'
import Header from './Header'
import { useEffect } from 'react';
import { closestCenter, DndContext, PointerSensor, useSensors, useSensor } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';



function App() {


  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});
  const columns = ["todo", "inprogress", "done"];

  useEffect(() => {
    const storageData = localStorage.getItem("tasks");
    setTasks(storageData ? JSON.parse(storageData) : []);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      },
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;


    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;


    const overContainer =
      over.data.current?.sortable?.containerId || over.id;


    const updatedTask = { ...activeTask, status: overContainer };
    const columns = ["todo", "inprogress", "done"];



    const newTaskList = tasks.map((t) =>
      t.id === activeId ? updatedTask : t
    );
    setTasks(newTaskList);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  };


  function addTask(task) {
    const newTaskList = [...tasks, task];
    setTasks(newTaskList);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  }

  function showUpdateForm(task) {
    setTaskToUpdate(task);
    showModal();

  }

  function updatedTask(updatedTask) {
    const newTaskList = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    setTasks(newTaskList);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  }
  function deleteTask(taskId) {
    const deleteTask = tasks.filter(t => t.id !== taskId);
    setTasks(deleteTask);
    localStorage.setItem("tasks", JSON.stringify(deleteTask));
  }

  function handleTask(operation, task) {
    if (operation === 'add') {
      addTask(task);
    } else if (operation === 'update') {
      updatedTask(task);
    } else if (operation === 'delete') {
      deleteTask(task.id);
    }
    hideModal();
  }


  function showModal() {

    setIsModalOpen(true);
  };

  function hideModal() {
    setIsModalOpen(false);
  };


  return (



    <>
      <Header />
      {isModalOpen ?
        (
          <CreateTask hideModal={hideModal} handleTask={handleTask} task={taskToUpdate} />
        ) : (

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {columns.map((col) => (
              <SortableContext key={col} items={tasks.filter((task) => task.status === col).map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <Board column={col} tasks={tasks.filter((task) => task.status === col)} showUpdateForm={showUpdateForm} deleteTask={deleteTask} showModal={showModal} />

              </SortableContext>
            ))}


          </DndContext>

        )}




    </>
  )
}

export default App
