import { useReducer } from "react";
import { initialState } from "../data/tasks";
import { taskReducer } from "../reducer";
import AddToTask from "./AddToTask";
import FormModal from "./FormModal";
import TaskCard from "./TaskCard";

const TaskList = ({ searchTerm }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const handleAddToTask = (e, newTask, isAdd) => {
    e.preventDefault();
    dispatch({
      type: isAdd ? "ADD_TASK" : "UPDATE_TASK",
      payload: newTask,
    });
    dispatch({ type: "TOGGLE_MODAL" });
    dispatch({ type: "EDIT_TASK", payload: null });
  };

  const handleSortToggle = (category) => {
    dispatch({ type: "SET_SORT_ORDER", category });
  };

  const handleDelete = (name) => {
    dispatch({ type: "DELETE_TASK", payload: name });
  };

  const handleEditTask = (task) => {
    dispatch({ type: "TOGGLE_MODAL" });
    dispatch({ type: "EDIT_TASK", payload: task });
  };

  const filteredTasks = state.tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-7xl bg-black p-6 opacity-70">
      {state.showModal && (
        <FormModal
          taskEdit={state.taskEdit}
          onAddToTask={handleAddToTask}
          onClose={() => {
            dispatch({ type: "TOGGLE_MODAL" });
            dispatch({ type: "EDIT_TASK", payload: null });
          }}
        />
      )}
      <AddToTask onOpen={() => dispatch({ type: "TOGGLE_MODAL" })} />

      <div className="-mx-2 mb-6 flex flex-wrap">
        {["todo", "on-progress", "done", "revised"].map((category) => (
          <TaskCard
            key={category}
            onEdit={handleEditTask}
            onDelete={handleDelete}
            category={category}
            tasks={filteredTasks.filter((task) => task.category === category)}
            onSort={handleSortToggle}
            sortOrder={state.sortOrder[category]}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
