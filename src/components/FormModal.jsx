import React, { useState } from "react";

const FormModal = ({ onClose, onAddToTask, taskEdit }) => {
  const [task, setTask] = useState(
    taskEdit || {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      date: "",
      category: "",
    },
  );

  const [isAdd, setIsAdd] = useState(Object.is(taskEdit, null));
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className="absolute left-1/3 top-10 z-10 mx-auto w-1/2 transform rounded-lg bg-gray-800 bg-opacity-70 p-6 shadow-xl transition-all">
      {/* Modal Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-center text-2xl font-bold text-green-400">
          {" "}
          {isAdd ? "Create Task" : "Edit Task"}{" "}
        </h2>
        <button
          onClick={onClose}
          className="text-xl text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Due Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="todo">To-Do</option>
            <option value="inprogress">On Progress</option>
            <option value="done">Done</option>
            <option value="revised">Revised</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={(e) => onAddToTask(e, task, isAdd)}
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {isAdd ? "Create Task" : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
