import React, { useState, useEffect, createContext, useContext } from "react";

import jwt from "jsonwebtoken";
import PortfolioApi from "../api/api";
import useLocalStorage from "../hooks/useLocalStorage";
import { debug } from "util";
//import LoadingSpinner from "../components/common/LoadingSpinner";

export const TOKEN_STORAGE_ID = "portfolio-token";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            PortfolioApi.token = token;
            let currentUser = await PortfolioApi.getUser(username);
            setCurrentUser(currentUser);
          } catch (errors) {
            setCurrentUser(null);
          }
        }
        setIsLoading(true);
      }
      setIsLoading(false);
      getCurrentUser();
    },
    [token]
  );

  const refresh = async (username) => {
    try {
      let currentUser = await PortfolioApi.getUser(username);
      setCurrentUser(currentUser);
    } catch (errors) {
      setCurrentUser(null);
    }
  };

  const login = async (data) => {
    try {
      let token = await PortfolioApi.login(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const signup = async (data) => {
    try {
      let token = await PortfolioApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const update = async (data) => {
    try {
      let { username, watchlist, portfolios, ...rest } = data;
      let currentUser = await PortfolioApi.updateUser(username, { ...rest });
      setCurrentUser((prevState) => ({
        ...prevState,
        ...currentUser,
      }));
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    return { success: true };
  };

  //if (!isLoading) return <LoadingSpinner />;

  return (
    <AuthContext.Provider
      value={{ token, currentUser, setCurrentUser, refresh, login, signup, update, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
