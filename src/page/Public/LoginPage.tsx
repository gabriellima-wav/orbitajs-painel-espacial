import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Chip,
  Link,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Rocket,
  AdminPanelSettings,
  Person
} from '@mui/icons-material';

interface LoginForm {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Dados de usuário para demonstração
  const mockUsers = [
    { email: 'admin@teste.com', password: '123456', name: 'Administrador', id: '1' },
    { email: 'user@teste.com', password: 'senha123', name: 'Usuário', id: '2' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError('Email é obrigatório');
      return false;
    }
    if (!formData.password) {
      setError('Senha é obrigatória');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        const token = `jwt_token_${Date.now()}_${user.id}`;
        
        const userData: User = {
          id: user.id,
          email: user.email,
          name: user.name,
          token: token
        };

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');

        window.location.href = '/dashboard';
      } else {
        setError('Email ou senha incorretos');
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (userType: 'admin' | 'user') => {
    const demoUser = userType === 'admin' ? mockUsers[0] : mockUsers[1];
    setFormData({
      email: demoUser.email,
      password: demoUser.password
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
        }
      }}
    >
      {/* Background Stars Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '4px',
            height: '4px',
            backgroundColor: '#c084fc',
            borderRadius: '50%',
            animation: 'twinkle 2s infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '20%',
            right: '20%',
            width: '8px',
            height: '8px',
            backgroundColor: '#f472b6',
            borderRadius: '50%',
            animation: 'twinkle 3s infinite',
          },
        }}
      />

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
          {/* Header */}
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
              Bem-vindo de volta!
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Faça login para acessar seu dashboard espacial
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleLogin}>
            <Stack spacing={3}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                disabled={loading}
                error={error !== '' && !formData.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'primary.main',
                  },
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Sua senha"
                disabled={loading}
                error={error !== '' && !formData.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        disabled={loading}
                        edge="end"
                        sx={{ color: 'primary.main' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'primary.main',
                  },
                }}
              />

              {/* Error Alert */}
              {error && (
                <Alert severity="error">
                  {error}
                </Alert>
              )}

              {/* Login Button */}
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
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Rocket />}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </Stack>
          </Box>

          {/* Demo Section */}
          <Box mt={4}>
            <Divider sx={{ borderColor: 'rgba(168, 85, 247, 0.2)' }}>
              <Chip 
                label="Contas de demonstração" 
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
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                startIcon={<AdminPanelSettings />}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Admin Demo
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleDemoLogin('user')}
                disabled={loading}
                startIcon={<Person />}
                sx={{
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                User Demo
              </Button>
            </Stack>
          </Box>

          {/* Footer Links */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary" mb={1}>
              Não tem uma conta?{' '}
              <Link 
                href="/register" 
                color="primary.main" 
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
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
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Esqueceu a senha?
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default LoginPage;
