// context/AuthContext.ts
import { createContext } from 'react';

export type User = {
  uid: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  login: ({ email, senha }: { email: string; senha: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
