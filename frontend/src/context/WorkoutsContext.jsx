import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

const initalState = {
  workouts: null,
  notifcation: null,
};

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        // ...state,
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
        notification: "created",
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
        notification: "deleted",
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
        notification: "updated",
      };
    case "CLEAR_NOTIFICATION":
      return {
        // ...state,
        workouts: state.workouts,
        notifcation: null,
      };

    default:
      return state;
  }
};

export const WorkoutsContextProver = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, initalState);

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
