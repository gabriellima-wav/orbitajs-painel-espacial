// src/pages/LoginPage.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Rocket,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFirebaseLogin } from "../../hooks/useFirebaseLogin";
import { AuthBackground } from "../../components/layout/AuthBackground";
import { GlassCard } from "../../components/ui/GlassCard";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const { login, error, loading } = useFirebaseLogin();

  const validateForm = (): boolean => {
    const errors = { email: false, password: false };
    if (!formData.email) {
      errors.email = true;
    }
    if (!formData.password) {
      errors.password = true;
    }
    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch {
      // O erro já é tratado pelo hook e exibido abaixo
    }
  };

  return (
    <AuthBackground>
      <GlassCard>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box
            sx={{
              fontSize: "4rem",
              mb: 2,
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <Rocket sx={{ fontSize: "inherit", color: "primary.main" }} />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, #c084fc, #f472b6, #a855f7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Bem-vindo de volta!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Faça login para acessar seu dashboard espacial
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleLogin}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              disabled={loading}
              error={fieldErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  background: "transparent",
                  backdropFilter: "none",
                },
                "& .MuiInputLabel-root": { color: "primary.main" },
              }}
            />
            
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Sua senha"
              disabled={loading}
              error={fieldErrors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={loading}
                      edge="end"
                      sx={{ color: "primary.main" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  background: "transparent",
                  backdropFilter: "none",
                },
                "& .MuiInputLabel-root": { color: "primary.main" },
              }}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                background: "linear-gradient(45deg, #a855f7, #ec4899)",
                "&:hover": {
                  background: "linear-gradient(45deg, #9333ea, #db2777)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Rocket />
                )
              }
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </Stack>
        </Box>

        {/* Footer */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary" mb={1}>
            Não tem uma conta?{" "}
            <Link
              href="/register"
              color="primary.main"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Cadastre-se
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link
              href="/forgot-password"
              color="primary.main"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Esqueceu a senha?
            </Link>
          </Typography>
        </Box>
      </GlassCard>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </AuthBackground>
  );
};

export default LoginPage;
