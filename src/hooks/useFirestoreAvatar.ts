import { auth, db } from '@/firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useCallback, useState } from 'react';

export function useFirestoreAvatar() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!auth.currentUser) {
      setError('Usuário não autenticado');
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      // Validar arquivo
      if (!file.type.startsWith('image/')) {
        throw new Error('Arquivo deve ser uma imagem');
      }

      if (file.size > 2 * 1024 * 1024) {
        // 2MB (menor que Storage)
        throw new Error('Arquivo muito grande. Máximo 2MB');
      }

      // Converter para Base64
      const base64 = await convertToBase64(file);
      const userId = auth.currentUser.uid;

      // Salvar no Firestore
      const userDocRef = doc(db, 'users', userId);
      await setDoc(
        userDocRef,
        {
          avatar: base64,
          avatarUpdatedAt: new Date(),
          displayName: auth.currentUser.displayName || '',
          email: auth.currentUser.email,
        },
        { merge: true }
      );

      // Atualizar perfil do usuário (usar o Base64 como photoURL)
      await updateProfile(auth.currentUser, {
        photoURL: base64,
      });

      return base64;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao fazer upload da imagem');
      } else {
        setError('Erro ao fazer upload da imagem');
      }
      return null;
    } finally {
      setUploading(false);
    }
  };

  const getAvatar = async (userId: string): Promise<string | null> => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data().avatar || null;
      }
      return null;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao buscar avatar');
      } else {
        setError('Erro ao buscar avatar');
      }
      return null;
    }
  };

  const deleteAvatar = async (): Promise<boolean> => {
    if (!auth.currentUser) {
      setError('Usuário não autenticado');
      return false;
    }

    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'users', userId);

      // Remover avatar do Firestore
      await updateDoc(userDocRef, {
        avatar: null,
        avatarUpdatedAt: new Date(),
      });

      // Remover do perfil do usuário
      await updateProfile(auth.currentUser, {
        photoURL: null,
      });

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao deletar avatar');
      } else {
        setError('Erro ao deletar avatar');
      }
      return false;
    }
  };

  return {
    uploadAvatar,
    getAvatar,
    deleteAvatar,
    uploading,
    error,
    setError,
  };
}

// Função auxiliar para converter arquivo para Base64
function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
