// src/components/profile/PasswordDialog.tsx
import  { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordDialogProps {
  open: boolean;
  onClose: () => void;
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  onChangePassword: () => void;
  loading: boolean;
}

export default function PasswordDialog({
  open,
  onClose,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onChangePassword,
  loading,
}: PasswordDialogProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      "& fieldset": {
        borderColor: "rgba(168, 85, 247, 0.3)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(168, 85, 247, 0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-focused": {
        color: "primary.main",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          background: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
        },
      }}
    >
      <DialogTitle sx={{ color: "white" }}>
        Alterar Senha
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Senha Atual"
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    sx={{ color: "primary.main" }}
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <TextField
            label="Nova Senha"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    sx={{ color: "primary.main" }}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <TextField
            label="Confirmar Nova Senha"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{ color: "primary.main" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onChangePassword}
          disabled={loading}
          variant="contained"
          sx={{
            background: "linear-gradient(45deg, #a855f7, #ec4899)",
            "&:hover": {
              background: "linear-gradient(45deg, #9333ea, #db2777)",
            },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Alterar Senha"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
