
import { useSortable } from "@dnd-kit/sortable";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";


function Board({ column, tasks = [], showUpdateForm, deleteTask, showModal }) {

    const titles = {
        todo: "To Do",
        inprogress: "In Progress",
        done: "Done",
    };


    const { setNodeRef } = useDroppable({
        id: column
    });
    return (



        // <div className='w-5xl mx-auto max-h-screen overflow-hidden'>
        //     <div className='grid grid-cols-3 bg-slate-100  gap-4 p-4  rounded-lg shadow-lg'>

        <div className='bg-white rounded-lg shadow-lg p-4 h-screen overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold '>{titles[column]}</h2>
                {column === "todo" && (
                    <button onClick={showModal} className="text-xl font-bold cursor-pointer">+</button>
                )}
            </div>
            <div ref={setNodeRef} className='space-y-4'>
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} showUpdateForm={showUpdateForm} deleteTask={deleteTask} />
                ))}
            </div>
        </div>)






    // </div >
    // </div>)
}

export default Board


