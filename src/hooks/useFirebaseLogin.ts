import { useState, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export function useFirebaseLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        setError("An unknown error occurred.");
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, error, loading };
}
