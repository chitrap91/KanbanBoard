import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

function TaskCard({ task, updatedTask, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 p-4 rounded-lg shadow-lg"
    >
      <div className="flex justify-end gap-2">
        <FaRegEdit
          className="cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={() =>
            updatedTask({ ...task, title: task.title + " (Updated)" })
          }
        />
        <MdOutlineDeleteOutline
          className="cursor-pointer text-red-500 hover:text-red-700"
          onClick={() => deleteTask(task.id)}
        />
      </div>

      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-600">{task.priority}</p>
    </div>
  );
}

export default TaskCard;
