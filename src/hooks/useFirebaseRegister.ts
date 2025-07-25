import { auth } from '@/firebase/firebaseConfig';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState } from 'react';

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
          // await updateProfile(userCredential.user, { displayName }); // This line was removed as per the edit hint
        }
        return userCredential.user;
      } catch (err: unknown) {
        if (
          err &&
          typeof err === 'object' &&
          err !== null &&
          'code' in err &&
          typeof (err as { code: unknown }).code === 'string'
        ) {
          setError(getFirebaseErrorMessage((err as { code: string }).code));
        } else {
          setError('Ocorreu um erro inesperado. Tente novamente.');
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
