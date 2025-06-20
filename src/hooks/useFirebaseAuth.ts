import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  type User
} from "firebase/auth";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../firebase/firebaseConfig";

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitora estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Função de login
  const login = useCallback(async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }, []);

  // Função de logout
  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return { 
    user, 
    loading,
    login,
    logout
  };
}
