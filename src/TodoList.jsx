import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSun, FaMoon, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./App.css";

export default function TodoList() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [goal, setGoal] = useState("");
  const [feeling, setFeeling] = useState("");
  const [taskHistory, setTaskHistory] = useState(() => JSON.parse(localStorage.getItem("taskHistory")) || []);
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskHistory", JSON.stringify(taskHistory));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [tasks, taskHistory, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = () => {
    if (!task || !date || !time || !goal || !feeling) return;
    const newTask = { text: task, date, time, goal, feeling };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
      setTaskHistory([...taskHistory, newTask]);
    }

    setTask("");
    setDate("");
    setTime("");
    setGoal("");
    setFeeling("");
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.text);
    setDate(taskToEdit.date);
    setTime(taskToEdit.time);
    setGoal(taskToEdit.goal);
    setFeeling(taskToEdit.feeling);
    setEditIndex(index);
  };

  return (
    <div className={`container-fluid vh-100 d-flex flex-column align-items-center justify-content-center ${darkMode ? "dark-mode" : "light-mode"}`}>
      <button className="btn-toggle" onClick={toggleDarkMode}>{darkMode ? <FaSun /> : <FaMoon />}</button>
      <h1>Task Manager</h1>
      <div className="input-group mb-3 w-50">
        <input type="text" className="form-control" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} />
        <input type="text" className="form-control" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <input type="text" className="form-control" placeholder="Feeling" value={feeling} onChange={(e) => setFeeling(e.target.value)} />
        <button className="btn btn-primary" onClick={addTask}><FaPlus /></button>
      </div>
      <div className="task-list w-50">
        {tasks.map((t, index) => (
          <div key={index} className="task-box">
            <div>
              <strong>{t.text}</strong>
              <div className="task-details">Date: {t.date} | Time: {t.time} | Goal: {t.goal} | Feeling: {t.feeling}</div>
            </div>
            <div>
              <button className="btn btn-warning me-2" onClick={() => editTask(index)}><FaEdit /></button>
              <button className="btn btn-danger" onClick={() => setTasks(tasks.filter((_, i) => i !== index))}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}