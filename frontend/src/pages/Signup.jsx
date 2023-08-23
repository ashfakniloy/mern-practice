import { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const { signup, isloading, error } = useSignup();
  const initialState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    setUser({
      ...user,
      [name]: type === "number" ? parseInt(value) || value : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user);
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="bg-gray-700 p-10 rounded-lg shadow-lg">
        <h4 className="text-xl font-bold tracking-wider">Sign Up</h4>

        <form
          className="mt-5 bg-gray-6 flex flex-col gap-6 min-w-[300px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="true"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isloading}
            className="mt-4 bg-gray-500 disabled:opacity-50 px-4 py-2.5 text-sm font-bold uppercase"
          >
            submit
          </button>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
