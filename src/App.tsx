import { useEffect, useState } from "react";
import { taskType } from "./utils/Types";
import { FormTask } from "./components/FormTask";
import { Task } from "./components/Task";
import "./index.css";

export function App() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<taskType | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("task-todolist") || "[]");
    setTasks(storedTasks);
  }, []);

  const saveTasks = (newTasks: taskType[]) => {
    setTasks(newTasks);
    localStorage.setItem("task-todolist", JSON.stringify(newTasks));
  };

  const handleSaveTask = (task: taskType) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) => (t.title === editingTask.title ? task : t));
      saveTasks(updatedTasks);
    } else {
      saveTasks([...tasks, task]);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (title: string) => {
    const updatedTasks = tasks.filter((task) => task.title !== title);
    saveTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status;
    if (filter === "pending") return !task.status;
    return true;
  });

  return (
    <section className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Lista de Tareas</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        >
          + Nueva Tarea
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        {["all", "completed", "pending"].map((option) => (
          <button
            key={option}
            className={`px-3 py-1 rounded ${
              filter === option ? "bg-gray-800 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter(option as "all" | "completed" | "pending")}
          >
            {option === "all" ? "Todas" : option === "completed" ? "Completadas" : "Pendientes"}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FormTask onClose={() => setShowForm(false)} onSave={handleSaveTask} initialTask={editingTask} />
        </div>
      )}

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <Task key={index} {...task} onEdit={() => {
              setEditingTask(task);
              setShowForm(true);
            }} onDelete={handleDeleteTask} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No hay tareas.</p>
        )}
      </div>
    </section>
  );
}