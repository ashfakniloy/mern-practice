import { useEffect, useState } from "react";
import { API } from "../config";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = ({ editUser, setEditUser }) => {
  const initialState = {
    title: "",
    reps: "",
    load: "",
  };
  const [workout, setWorkout] = useState(initialState);

  const [error, setError] = useState("");
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    editUser ? setWorkout(editUser) : setWorkout(initialState);
  }, [editUser]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    setWorkout({
      ...workout,
      [name]: type === "number" ? parseInt(value) || value : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (editUser) {
      const { title, reps, load } = workout;

      const res = await fetch(`${API}/workouts/${editUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, reps, load }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "UPDATE_WORKOUT", payload: data });
        setWorkout(initialState);
        setEditUser(null);
      } else {
        setError(data);
      }
    } else {
      const res = await fetch(`${API}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "CREATE_WORKOUT", payload: data });
        setWorkout(initialState);
      } else {
        setError(data.error);
      }
    }
  };

  return (
    <div className="sticky top-[50px]">
      <p className="text-2xl font-semibold">
        {!editUser ? "Add a new post" : `Edit ${editUser.title}`}
      </p>

      <form
        className="mt-5 flex flex-col gap-6 max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={workout.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            name="reps"
            id="reps"
            value={workout.reps}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="load">Load</label>
          <input
            type="number"
            name="load"
            id="load"
            value={workout.load}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gray-500 px-4 py-2.5 text-sm font-bold uppercase"
        >
          submit
        </button>
        {error && (
          <p className="mt-3 bg-gray-600 p-4 border-l-4 border-red-600 text-sm">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default WorkoutForm;
