import { auth } from "@/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";

export function usePasswordChange() {
  const { user } = useFirebaseAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validatePasswords = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Preencha todos os campos de senha.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      return false;
    }

    if (newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    return true;
  };

  const changePassword = async () => {
    if (!validatePasswords()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!auth.currentUser) {
        setError("Usuário não autenticado. Faça login novamente.");
        setLoading(false);
        return;
      }
      if (!user?.email) {
        setError("E-mail de usuário não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      setSuccess("Senha alterada com sucesso!");
      resetForm();
    } catch (error: unknown) {
      let errorMessage = "Erro ao alterar a senha. Tente novamente.";
      if (typeof error === "object" && error && "code" in error) {
        switch ((error as any).code) {
          case "auth/wrong-password":
            errorMessage = "A senha atual está incorreta.";
            break;
          case "auth/weak-password":
            errorMessage =
              "A nova senha é muito fraca. Use pelo menos 6 caracteres.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
            break;
          case "auth/requires-recent-login":
            errorMessage =
              "Por segurança, faça login novamente e tente alterar a senha.";
            break;
          case "auth/user-mismatch":
            errorMessage = "O usuário não corresponde ao autenticado atual.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Falha na conexão. Verifique sua internet.";
            break;
          default:
            errorMessage = "Erro desconhecido ao alterar a senha.";
        }
      }
      setError(errorMessage);
    }
    setLoading(false);
  };

  const sendPasswordResetEmail_ = async () => {
    if (!user?.email) {
      return;
    }
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, user.email);
      setSuccess("E-mail de recuperação enviado!");
    } catch {
      setError("Erro ao enviar e-mail de recuperação.");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const clearMessages = () => {
    setSuccess(null);
    setError(null);
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    changePassword,
    sendPasswordResetEmail: sendPasswordResetEmail_,
    loading,
    success,
    error,
    resetForm,
    clearMessages,
  };
}
