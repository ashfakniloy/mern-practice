import { useState } from "react";
import { API } from "../config";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [isloading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (values) => {
    setIsLoading(true);
    setError(false);

    const res = await fetch(`${API}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    } else {
      setIsLoading(false);
      setError(data.error);
    }
  };

  return { signup, isloading, error };
};

export default useSignup;
