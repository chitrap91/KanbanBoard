
import { useSortable } from "@dnd-kit/sortable";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";


function Board({ column, tasks = [], showUpdateForm, deleteTask, showModal }) {

    // const titles = {
    //     todo: "To Do",
    //     inprogress: "In Progress",
    //     done: "Done",
    // };


    const { setNodeRef } = useDroppable({
        id: column.id
    });
    return (
        <div className='bg-white rounded-lg shadow-lg p-4 h-screen overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold '>{column.title}</h2>
                {column.id === "todo" && (
                    <button onClick={showModal} className="text-xl font-bold cursor-pointer">+</button>
                )}
            </div>
            <div ref={setNodeRef} className='space-y-4'>
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} showUpdateForm={showUpdateForm} deleteTask={deleteTask} />
                ))}
            </div>
        </div>
    )
}

export default Board


