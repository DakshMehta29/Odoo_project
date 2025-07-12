import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (data) => {
    setUser({ name: data.name || "Alex", email: data.email, avatar: data.avatar || null });
  };

  const signup = (data) => {
    setUser({ name: data.name || "Alex", email: data.email, avatar: data.avatar || null });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
