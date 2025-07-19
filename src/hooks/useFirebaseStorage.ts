import { auth } from '@/firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useCallback, useState } from 'react';

export function useFirebaseStorage() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!auth.currentUser) {
      setError('Usuário não autenticado');
      return null;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const storage = getStorage();
      const userId = auth.currentUser.uid;
      const fileExtension = file.name.split('.').pop();
      const fileName = `avatars/${userId}/avatar.${fileExtension}`;
      const storageRef = ref(storage, fileName);

      // Validar arquivo
      if (!file.type.startsWith('image/')) {
        throw new Error('Arquivo deve ser uma imagem');
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        throw new Error('Arquivo muito grande. Máximo 5MB');
      }

      // Upload do arquivo
      const snapshot = await uploadBytes(storageRef, file);

      // Obter URL de download
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Atualizar perfil do usuário
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      setUploadProgress(100);
      return downloadURL;
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

  const deleteAvatar = async (photoURL: string): Promise<boolean> => {
    if (!auth.currentUser) {
      setError('Usuário não autenticado');
      return false;
    }

    try {
      const storage = getStorage();
      const photoRef = ref(storage, photoURL);
      await deleteObject(photoRef);

      // Remover do perfil do usuário
      await updateProfile(auth.currentUser, {
        photoURL: null,
      });
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao deletar imagem');
      } else {
        setError('Erro ao deletar imagem');
      }
      return false;
    }
  };

  return {
    uploadAvatar,
    deleteAvatar,
    uploading,
    uploadProgress,
    error,
    setError,
  };
}
