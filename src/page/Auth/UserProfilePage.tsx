// src/pages/UserProfilePage.tsx
import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { Save, Lock, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";
import { usePasswordChange } from "../../hooks/usePasswordChange";
import AvatarSection from "../../components/profile/AvatarSection";
import ProfileForm from "../../components/profile/ProfileForm";
import PasswordDialog from "../../components/profile/PasswordDialog";
import { useFirebaseStorage } from "../../hooks/useFirebaseStorage";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const {
    user,
    displayName,
    setDisplayName,
    avatar,
    handleAvatarChange,
    updateUserProfile,
    loading: profileLoading,
    success: profileSuccess,
    error: profileError,
    clearMessages: clearProfileMessages,
    uploadingAvatar = false,
  } = useUserProfile();

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    changePassword,
    sendPasswordResetEmail,
    loading: passwordLoading,
    success: passwordSuccess,
    error: passwordError,
    resetForm,
    clearMessages: clearPasswordMessages,
  } = usePasswordChange();

  const loading = profileLoading || passwordLoading;
  const success = profileSuccess || passwordSuccess;
  const error = profileError || passwordError;

  const handlePasswordChangeClick = () => {
    setPasswordDialogOpen(true);
    resetForm();
    clearPasswordMessages();
    clearProfileMessages();
  };

  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
    resetForm();
  };

  const handlePasswordChange = async () => {
    await changePassword();
    if (passwordSuccess) {
      setPasswordDialogOpen(false);
    }
  };

  const { deleteAvatar } = useFirebaseStorage();

  const handleDeleteAvatar = async () => {
    if (user?.photoURL) {
      const success = await deleteAvatar(user.photoURL);
      if (success) {
        handleAvatarChange({
          target: { files: null, value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
      }}
    >
      {/* Botão de voltar */}
      <IconButton
        onClick={() => navigate("/dashboard")}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(168, 85, 247, 0.3)",
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(30, 41, 59, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(168, 85, 247, 0.2)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header */}
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={3}
            textAlign="center"
            sx={{
              background: "linear-gradient(45deg, #c084fc, #f472b6, #a855f7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Configurações da Conta
          </Typography>

          <Stack spacing={4} alignItems="center">
            {/* Avatar Section */}
            <AvatarSection
              avatar={avatar}
              displayName={displayName}
              onAvatarChange={handleAvatarChange}
              onDeleteAvatar={handleDeleteAvatar}
              uploading={uploadingAvatar}
            />

            {/* Form Fields */}
            <ProfileForm
              displayName={displayName}
              setDisplayName={setDisplayName}
              email={user?.email || ""}
            />

            {/* Action Buttons */}
            <Stack spacing={2} width="100%">
              <Button
                variant="contained"
                onClick={updateUserProfile}
                disabled={loading}
                fullWidth
                size="large"
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Save />
                  )
                }
                sx={{
                  py: 1.5,
                  background: "linear-gradient(45deg, #a855f7, #ec4899)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #9333ea, #db2777)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)",
                  },
                  "&:disabled": {
                    background: "rgba(168, 85, 247, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>

              <Divider
                sx={{
                  borderColor: "rgba(168, 85, 247, 0.3)",
                  my: 2,
                }}
              />

              <Button
                variant="outlined"
                onClick={handlePasswordChangeClick}
                fullWidth
                size="large"
                disabled={loading}
                startIcon={<Lock />}
                sx={{
                  py: 1.5,
                  borderColor: "rgba(168, 85, 247, 0.5)",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Alterar Senha
              </Button>

              <Button
                variant="text"
                onClick={sendPasswordResetEmail}
                fullWidth
                disabled={loading}
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                  },
                }}
              >
                Esqueci minha senha (enviar por e-mail)
              </Button>
            </Stack>

            {/* Alerts */}
            {success && (
              <Alert
                severity="success"
                sx={{
                  width: "100%",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "#22c55e",
                }}
              >
                {success}
              </Alert>
            )}
            {error && (
              <Alert
                severity="error"
                sx={{
                  width: "100%",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                }}
              >
                {error}
              </Alert>
            )}
          </Stack>
        </Paper>
      </Container>

      {/* Dialog de Alteração de Senha */}
      <PasswordDialog
        open={passwordDialogOpen}
        onClose={handlePasswordDialogClose}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onChangePassword={handlePasswordChange}
        loading={loading}
      />
    </Box>
  );
}
