// src/hooks/useUserProfile.ts
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useFirestoreAvatar } from "./useFirestoreAvatar";

export function useUserProfile() {
  const { user } = useFirebaseAuth();
  const { uploadAvatar, getAvatar, deleteAvatar, uploading: uploadingAvatar, error: uploadError } = useFirestoreAvatar();
  
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [avatar, setAvatar] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Carregar avatar do Firestore quando o usuário mudar
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      
      // Tentar carregar avatar do Firestore se não tiver no perfil
      if (!user.photoURL) {
        getAvatar(user.uid).then(avatarFromFirestore => {
          if (avatarFromFirestore) {
            setAvatar(avatarFromFirestore);
          }
        });
      } else {
        setAvatar(user.photoURL);
      }
    }
  }, [user, getAvatar]);

  const updateUserProfile = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await updateProfile(auth.currentUser!, {
        displayName,
      });
      setSuccess("Perfil atualizado com sucesso!");
    } catch {
      setError("Erro ao atualizar perfil. Tente novamente.");
    }
    setLoading(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    try {
      const base64Avatar = await uploadAvatar(file);
      if (base64Avatar) {
        setAvatar(base64Avatar);
        setSuccess("Avatar atualizado com sucesso!");
      }
    } catch {
      setError(uploadError || "Erro ao fazer upload do avatar");
    }
  };

  const handleDeleteAvatar = async () => {
    const success = await deleteAvatar();
    if (success) {
      setAvatar("");
      setSuccess("Avatar removido com sucesso!");
    }
  };

  const clearMessages = () => {
    setSuccess(null);
    setError(null);
  };

  return {
    user,
    displayName,
    setDisplayName,
    avatar,
    handleAvatarChange,
    handleDeleteAvatar,
    updateUserProfile,
    loading: loading || uploadingAvatar,
    success,
    error: error || uploadError,
    clearMessages,
    uploadingAvatar,
  };
}
