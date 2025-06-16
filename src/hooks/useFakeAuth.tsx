import { useState } from 'react';

type User = {
  uid: string;
  email: string;
};

export function useFakeAuth() {
  const [user, setUser] = useState<User | null>(null);

  function login({ email, senha }: { email: string; senha: string }) {
    // Simula login com qualquer credencial
    if (email && senha) {
      setUser({ uid: '12345', email });
    }
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}
