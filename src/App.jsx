
import { use, useState } from 'react';
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

  useEffect(() => {
    const storageData = localStorage.getItem("tasks");
    setTasks(storageData ? JSON.parse(storageData) : []);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15,
      },
    })
  );



  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = [...items];
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, items[oldIndex]);
        return newItems;
      });
    }
  }
  function addTask(task) {
    const newTaskList = [...tasks, task];
    setTasks(newTaskList);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
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


  function showModal() {

    setIsModalOpen(true);
  };

  function hideModal() {
    setIsModalOpen(false);
  };


  return (
    <>
      <Header />
      {isModalOpen && <CreateTask hideModal={hideModal} addTask={addTask} />}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <Board tasks={tasks} updatedTask={updatedTask} deleteTask={deleteTask} showModal ={showModal}       />

        </SortableContext>

        
      </DndContext>



    </>
  )
}

export default App
