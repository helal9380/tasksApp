export const taskReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, showModal: !state.showModal };

    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        ),
      };

    case "EDIT_TASK":
      return { ...state, taskEdit: action.payload };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.name !== action.payload),
      };

    case "SET_SORT_ORDER":
      return {
        ...state,
        sortOrder: {
          ...state.sortOrder,
          [action.category]: !state.sortOrder[action.category],
        },
      };

    default:
      return state;
  }
};
