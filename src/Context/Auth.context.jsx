import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  function saveToken(value) {
    setToken(value);
    if (value) {
      localStorage.setItem("token", value);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }

  async function getUserData() {
    try {
      let { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: { token },
        }
      );
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: saveToken,
        user,
        getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
