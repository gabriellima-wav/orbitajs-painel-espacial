import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

export default function UserProfilePage() {
  const { user } = useFirebaseAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [avatar, setAvatar] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Atualizar nome e avatar
  const handleSave = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await updateProfile(auth.currentUser!, {
        displayName,
        photoURL: avatar || undefined,
      });
      setSuccess("Perfil atualizado com sucesso!");
    } catch {
      setError("Erro ao atualizar perfil. Tente novamente.");
    }
    setLoading(false);
  };

  // Upload de avatar (pode ser aprimorado com Firebase Storage)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Recuperação de senha
  const handlePasswordReset = async () => {
    if (!user?.email) return;
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #a855f7 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={20} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
            Configurações da Conta
          </Typography>
          <Stack spacing={3} alignItems="center">
            <Avatar
              src={avatar}
              alt={displayName || "Usuário"}
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Button variant="outlined" component="label">
              Alterar Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Button>
            <TextField
              label="Nome"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              fullWidth
              sx={{ py: 1.2 }}
            >
              {loading ? <CircularProgress size={20} /> : "Salvar Alterações"}
            </Button>
            <Divider flexItem sx={{ my: 2 }} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={handlePasswordReset}
              fullWidth
              disabled={loading}
            >
              Recuperar/Alterar Senha
            </Button>
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
