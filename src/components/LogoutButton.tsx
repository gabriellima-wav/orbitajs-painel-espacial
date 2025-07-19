import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Logout, MoreVert, Person } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
// src/components/auth/LogoutButton.tsx
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { user, logout } = useFirebaseAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    setConfirmOpen(false);
  };

  const handleCancelLogout = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleMenuClick}
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
          },
        }}
      >
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Logado como:
          </Typography>
          <Typography variant="body2" color="primary.main" fontWeight="bold">
            {user?.displayName || user?.email || 'Usuário'}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(168, 85, 247, 0.2)' }} />

        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon sx={{ color: 'primary.main' }}>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </MenuItem>

        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </MenuItem>
      </Menu>

      {/* Dialog de confirmação */}
      <Dialog
        open={confirmOpen}
        onClose={handleCancelLogout}
        sx={{
          '& .MuiDialog-paper': {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
          },
        }}
      >
        <DialogTitle>Confirmar Logout</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja sair da sua conta?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="error"
            variant="contained"
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
