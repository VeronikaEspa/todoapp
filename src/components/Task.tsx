import { taskType } from "../utils/Types";

interface TaskProps extends taskType {
  onEdit: () => void;
  onDelete: (title: string) => void;
}

export const Task = ({ title, description, status, onEdit, onDelete }: TaskProps) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {status ? "Completada" : "Pendiente"}
        </span>

        <div className="flex space-x-2">
          <button className="text-blue-500 hover:underline" onClick={onEdit}>Editar</button>
          <button className="text-red-500 hover:underline" onClick={() => onDelete(title)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};