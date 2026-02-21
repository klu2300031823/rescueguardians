import React, { createContext, useContext, useState, useCallback } from 'react';

export type Role = 'caretaker' | 'patient';

export interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string, role: Role) => boolean;
  signup: (user: User) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signup = useCallback((user: User): string | null => {
    if (users.find(u => u.email === user.email)) return 'Email already exists';
    setUsers(prev => [...prev, user]);
    setCurrentUser(user);
    return null;
  }, [users]);

  const login = useCallback((email: string, password: string, role: Role): boolean => {
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if (user) { setCurrentUser(user); return true; }
    return false;
  }, [users]);

  const logout = useCallback(() => setCurrentUser(null), []);

  return (
    <AuthContext.Provider value={{ currentUser, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
