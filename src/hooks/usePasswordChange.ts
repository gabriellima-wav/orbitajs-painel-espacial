import { auth } from '@/firebase/firebaseConfig';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth';
import { useState } from 'react';

export function usePasswordChange() {
  const { user } = useFirebaseAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validatePasswords = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Preencha todos os campos de senha.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('A nova senha e a confirmação não coincidem.');
      return false;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
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
      // Reautenticar o usuário
      const credential = EmailAuthProvider.credential(
        user?.email || '',
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser!, credential);

      // Atualizar a senha
      await updatePassword(auth.currentUser!, newPassword);

      setSuccess('Senha alterada com sucesso!');
      resetForm();
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as { code?: string }).code === 'string'
      ) {
        const code = (error as { code: string }).code;
        if (code === 'auth/wrong-password') {
          setError('Senha atual incorreta.');
        } else if (code === 'auth/weak-password') {
          setError('A nova senha é muito fraca.');
        } else {
          setError('Erro ao alterar senha. Tente novamente.');
        }
      } else {
        setError('Erro ao alterar senha. Tente novamente.');
      }
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
      setSuccess('E-mail de recuperação enviado!');
    } catch {
      setError('Erro ao enviar e-mail de recuperação.');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
