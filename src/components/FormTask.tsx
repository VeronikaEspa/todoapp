import { useState } from "react";
import { taskType } from "../utils/Types";

interface FormTaskProps {
  onClose: () => void;
  onSave: (task: taskType) => void;
  initialTask?: taskType | null;
}

export const FormTask = ({ onClose, onSave, initialTask }: FormTaskProps) => {
  const [task, setTask] = useState<taskType>(
    initialTask || { title: "", description: "", status: false }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onSave(task);
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {initialTask ? "Editar Tarea" : "Añadir Nueva Tarea"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={task.title}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={task.description}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="status" checked={task.status} onChange={handleChange} />
          <span className="text-gray-700">Completada</span>
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Guardar
        </button>
      </form>
      <button onClick={onClose} className="mt-4 text-gray-600 hover:underline">Cancelar</button>
    </div>
  );
};