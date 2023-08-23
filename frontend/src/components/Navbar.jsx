import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-gray-900">
      <div className=" flex justify-between items-center py-3 px-4 lg:max-w-[1150px] mx-auto">
        <h1 className="text-3xl text-cyan-200 font-semibold">
          <Link to="/">Posts</Link>
        </h1>

        {user ? (
          <div className="space-x-6">
            <span className="text-sm font-medium">{user.email}</span>
            <button
              className="text-sm font-bold px-2.5 py-1.5 rounded bg-gray-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-6 items-center">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
