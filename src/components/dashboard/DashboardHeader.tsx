import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: 80, md: 100 },
        px: { xs: 2, md: 4 },
        py: { xs: 1.5, md: 2 },
        mb: 2,
        borderRadius: 2,
        background: 'linear-gradient(90deg, #1e293b 60%, #a855f7 100%)',
        boxShadow: '0 8px 32px 0 rgba(168,85,247,0.15)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            background: 'linear-gradient(45deg, #c084fc, #f472b6, #a855f7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', md: '2rem' },
            textAlign: { xs: 'center', md: 'left' },
            mb: { xs: 1, md: 0 },
          }}
        >
          🚀 Dashboard Espacial
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#f3f4f6',
            textAlign: { xs: 'center', md: 'left' },
            mt: 0.5,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
          }}
        >
          Explore o universo com dados da NASA e SpaceX
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton
          onClick={() => navigate('/profile')}
          sx={{
            p: 0,
            borderRadius: '50%',
            boxShadow: 2,
            '&:hover': { boxShadow: 4 },
          }}
        >
          <Avatar
            src={user?.photoURL || undefined}
            alt={user?.displayName || 'Usuário'}
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
        <Typography
          variant="body2"
          sx={{ color: '#f3f4f6', fontSize: { xs: '0.95rem', md: '1rem' } }}
        >
          Bem-vindo, {user?.displayName || user?.email || 'Usuário'}!
        </Typography>
      </Box>
    </Box>
  );
}
