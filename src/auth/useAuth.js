import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_BASE_URL } from "../configs/Constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const signIn = async (username, password) => {
    try {
      const response = await fetch(`${APP_BASE_URL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("signIn", {
      replace: true,
    });
  };

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    // eslint-disable-next-line
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
