import { useEffect, useState } from "react";
import { API } from "../config";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, notification, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [editUser, setEditUser] = useState(null);

  console.log(notification);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch(`${API}/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        // console.log(data);

        dispatch({ type: "SET_WORKOUTS", payload: data });
      } else {
        console.log(data);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 1500);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="my-10 relative">
      {notification && (
        <div className="absolute flex justify-center -top-10 left-0 right-0">
          <span className="text-center bg-gray-700 px-3 py-2 text-sm rounded capitalize">
            Post {notification} Successfully!
          </span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-20">
        <div className="col-span-2">
          <h1 className="text-2xl font-semibold">All Posts</h1>
          <div className="mt-5 space-y-6">
            {workouts &&
              workouts.map((workout) => (
                <Workout
                  key={workout._id}
                  workout={workout}
                  setEditUser={setEditUser}
                />
              ))}
          </div>
        </div>

        <div className="col-span-1">
          <WorkoutForm editUser={editUser} setEditUser={setEditUser} />
        </div>
      </div>
    </div>
  );
};

export default Home;
