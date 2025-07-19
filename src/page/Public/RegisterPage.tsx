import { useFirebaseRegister } from '@/hooks/useFirebaseRegister';
import {
  Email,
  Lock,
  Person,
  Rocket,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    displayName: false,
  });
  const navigate = useNavigate();

  const { register, error, loading } = useFirebaseRegister();

  const validateForm = (): boolean => {
    const errors = {
      email: false,
      password: false,
      confirmPassword: false,
      displayName: false,
    };
    if (!formData.email) {
      errors.email = true;
    }
    if (!formData.displayName) {
      errors.displayName = true;
    }
    if (!formData.password) {
      errors.password = true;
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = true;
    }
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      errors.password = true;
      errors.confirmPassword = true;
    }
    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await register(formData.email, formData.password, formData.displayName);
      navigate('/dashboard');
    } catch {
      // erro já tratado pelo hook
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/wallpaper.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 15, 35, 0.7)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(168, 85, 247, 0.08)',
            backdropFilter: 'blur(25px)',
            border: '1px solid rgba(168, 85, 247, 0.15)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                fontSize: '4rem',
                mb: 2,
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              <Rocket sx={{ fontSize: 'inherit', color: 'primary.main' }} />
            </Box>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #c084fc, #f472b6, #a855f7)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Criar conta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Preencha os campos para se cadastrar
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleRegister}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Nome"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Seu nome"
                disabled={loading}
                error={fieldErrors.displayName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiInputLabel-root': { color: 'primary.main' } }}
              />
              <TextField
                fullWidth
                label="Email"
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
                sx={{ '& .MuiInputLabel-root': { color: 'primary.main' } }}
              />
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
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
                        sx={{ color: 'primary.main' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiInputLabel-root': { color: 'primary.main' } }}
              />
              <TextField
                fullWidth
                label="Confirmar senha"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirme sua senha"
                disabled={loading}
                error={fieldErrors.confirmPassword}
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
                        sx={{ color: 'primary.main' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiInputLabel-root': { color: 'primary.main' } }}
              />
              {formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <Alert severity="warning">As senhas não coincidem.</Alert>
                )}
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(45deg, #a855f7, #ec4899)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #9333ea, #db2777)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Rocket />
                  )
                }
              >
                {loading ? 'Criando...' : 'Criar conta'}
              </Button>
            </Stack>
          </Box>
          <Box mt={4}>
            <Divider sx={{ borderColor: 'rgba(168, 85, 247, 0.2)' }}>
              <Chip
                label="Já tem uma conta?"
                size="small"
                sx={{
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  color: 'text.secondary',
                }}
              />
            </Divider>
            <Stack direction="row" spacing={2} mt={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/login')}
                startIcon={<Person />}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Ir para login
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </Box>
  );
};

export default RegisterPage;
