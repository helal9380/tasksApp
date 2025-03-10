import { useState } from "react";
import { tasks } from "../data/tasks";
import AddToTask from "./AddToTask";
import FormModal from "./FormModal";
import TaskCard from "./TaskCard";

const TaskList = ({ searchTerm }) => {
  const [showModal, setShowModal] = useState(false);
  const [allTask, setAllTask] = useState(tasks);
  const [taskEdit, setTaskEdit] = useState(null);
  const [sortOrder, setSortOrder] = useState({
    todo: true,
    "on-progress": true,
    done: true,
    revised: true,
  });

  const handleAddToTask = (e, newTask, isAdd) => {
    if (isAdd) {
      setAllTask((prevTasks) =>
        [...prevTasks, newTask].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        ),
      );
    } else {
      setAllTask(
        allTask.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        }),
      );
    }
    e.preventDefault();
    if (!newTask || Object.keys(newTask).length === 0) {
      console.error("Invalid task data");
      return;
    }
    setShowModal(false);
    setTaskEdit(null);
  };

  const filteredTasks = allTask.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSortToggle = (category) => {
    setSortOrder((prev) => ({
      ...prev,
      [category]: !prev[category], // Toggle sorting order for this category
    }));
  };

  const handleDelete = (name) => {
    setAllTask((prevTask) => prevTask.filter((task) => task.name !== name));
  };

  const handleEditTask = (category) => {
    setShowModal(true);
    setTaskEdit(category);
    console.log(category);
  };

  return (
    <div className="mx-auto max-w-7xl bg-black p-6 opacity-70">
      {showModal && (
        <FormModal
          taskEdit={taskEdit}
          onAddToTask={handleAddToTask}
          onClose={() => {
            setShowModal(false), setTaskEdit(null);
          }}
        />
      )}
      <AddToTask onOpen={() => setShowModal(true)} />

      <div className="-mx-2 mb-6 flex flex-wrap">
        <TaskCard
          onEdit={handleEditTask}
          onDelete={handleDelete}
          category="todo"
          tasks={filteredTasks.filter((task) => task.category === "todo")}
          onSort={handleSortToggle}
          sortOrder={sortOrder.todo}
        />
        <TaskCard
          onEdit={handleEditTask}
          onDelete={handleDelete}
          category="on-progress"
          tasks={filteredTasks.filter(
            (task) => task.category === "on-progress",
          )}
          onSort={handleSortToggle}
          sortOrder={sortOrder["on-progress"]}
        />
        <TaskCard
          onEdit={handleEditTask}
          onDelete={handleDelete}
          category="done"
          tasks={filteredTasks.filter((task) => task.category === "done")}
          onSort={handleSortToggle}
          sortOrder={sortOrder.done}
        />
        <TaskCard
          onEdit={handleEditTask}
          onDelete={handleDelete}
          category="revised"
          tasks={filteredTasks.filter((task) => task.category === "revised")}
          onSort={handleSortToggle}
          sortOrder={sortOrder.revised}
        />
      </div>
    </div>
  );
};

export default TaskList;
