import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

function TaskCard({ task, showUpdateForm, deleteTask }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useDraggable({ id: task.id });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
        zIndex: transform ? 9999 : "auto",  
        position: transform ? "relative" : "static", 

    };
    console.log(">>>>>> task in taskcard", task);
    return (
        <>

            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={(e) => {
                    e.stopPropagation(); 
                    showUpdateForm(task);
                }}
                className="bg-gray-100 p-4 rounded-lg shadow-lg"
            >
                <div className="flex justify-end gap-2">
                    <FaRegEdit
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            showUpdateForm(task);
                        }}
                    />
                    <MdOutlineDeleteOutline
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={(e) => {
                            e.stopPropagation(); // ❗ prevent triggering drag
                            deleteTask(task.id);
                        }}
                    />
                </div>

                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-600">{task.priority}</p>
            </div>
        </>

    );
}

export default TaskCard;
