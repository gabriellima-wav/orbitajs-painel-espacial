import { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


export function useFirebaseRegister() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = useCallback(
    async (email: string, password: string, displayName?: string) => {
      setLoading(true);
      setError(null);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (displayName) {
          await updateProfile(userCredential.user, { displayName });
        }
        return userCredential.user;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { register, error, loading };
}
