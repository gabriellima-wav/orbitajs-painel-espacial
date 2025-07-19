import { auth } from '@/firebase/firebaseConfig';
import { Email, Rocket } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import type React from 'react';
import { useState } from 'react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!email) {
      setFieldError(true);
      return;
    }
    setFieldError(false);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(
        'Enviamos um e-mail com instruções para redefinir sua senha. Verifique sua caixa de entrada!'
      );
    } catch (err: unknown) {
      // Tratamento básico de erros do Firebase
      const error = err as { code?: string };
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg('O e-mail informado é inválido.');
          break;
        case 'auth/user-not-found':
          setErrorMsg('Nenhuma conta encontrada com esse e-mail.');
          break;
        default:
          setErrorMsg('Ocorreu um erro ao enviar o e-mail. Tente novamente.');
      }
    } finally {
      setLoading(false);
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
              Recuperar senha
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Informe seu e-mail para receber o link de redefinição de senha
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={loading}
                error={fieldError}
                InputProps={{
                  startAdornment: <Email color="primary" sx={{ mr: 1 }} />,
                }}
                sx={{
                  '& .MuiInputLabel-root': { color: 'primary.main' },
                }}
              />

              {successMsg && <Alert severity="success">{successMsg}</Alert>}
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

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
                {loading ? 'Enviando...' : 'Enviar link'}
              </Button>
            </Stack>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Lembrou sua senha?{' '}
              <Link
                href="/login"
                color="primary.main"
                sx={{
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Voltar ao login
              </Link>
            </Typography>
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

export default ForgotPasswordPage;
