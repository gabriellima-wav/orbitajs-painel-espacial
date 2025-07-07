import { useState, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";

export function useFirebaseLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err: unknown) {
      if (err && typeof err === "object" && err !== null && "code" in err && typeof (err as { code: unknown }).code === "string") {
        setError(getFirebaseErrorMessage((err as { code: string }).code));
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, error, loading };
}
