import { formatDistanceToNow } from "date-fns";
import { API } from "../config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Workout = ({ workout, setEditUser }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    setEditUser(null);
    if (!user) {
      return;
    }
    const res = await fetch(`${API}/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    } else {
      console.log(data);
    }

    console.log(data);
  };

  const handleEdit = () => {
    setEditUser(workout);
  };

  return (
    <div className="bg-gray-700 p-3 shadow-lg border-l-[6px] border-red-700/70 flex justify-between items-center">
      <div className="">
        <p className="text-xl text-red-200 font-bold">{workout.title}</p>
        <p className="mt-4 font-medium">Reps: {workout.reps}</p>
        <p className="font-medium">Load: {workout.load}</p>
        <p className="mt-3 text-sm">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className="space-x-5 mr-3">
        <button
          className="bg-gray-600 active:bg-gray-800 px-3 py-2 rounded text-xs font-bold"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-green-700 active:bg-green-800 px-3 py-2 rounded text-xs font-bold"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Workout;
