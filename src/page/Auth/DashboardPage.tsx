import { Refresh } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type React from 'react';

import BackgroundStars from '@/components/BackgroundStars';
import ApodCard from '@/components/dashboard/ApodCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PlanetCarousel from '@/components/dashboard/PlanetCarousel';
import planets from '@/components/dashboard/PlanetsList';
import SpaceXLaunchCard from '@/components/dashboard/SpaceXLaunchCard';

import { useNasaApod } from '@/features/nasa/nasaService';
import { useSpaceXLaunches } from '@/features/spacex/spaceXService';
import { useCountdown } from '@/hooks/useCountdown';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  // Hooks das APIs
  const {
    data: apodData,
    loading: apodLoading,
    error: apodError,
    refetch: refetchApod,
  } = useNasaApod();

  const {
    nextLaunch,
    loading: spaceXLoading,
    error: spaceXError,
    refetch: refetchSpaceX,
  } = useSpaceXLaunches();

  // Countdown para o próximo lançamento
  const timeLeft = useCountdown(nextLaunch?.date_utc || null);

  // Estados combinados
  const loading = apodLoading || spaceXLoading;
  const error = apodError || spaceXError;

  // Função para recarregar todos os dados
  const handleRefreshAll = () => {
    refetchApod();
    refetchSpaceX();
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
        <Typography variant="h6" color="white" textAlign="center">
          🚀 Carregando dados do espaço...
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Conectando com NASA e SpaceX APIs
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          p: 4,
        }}
      >
        <Typography variant="h5" color="error.main" textAlign="center">
          ⚠️ Erro ao carregar dados
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={handleRefreshAll}
          startIcon={<Refresh />}
          sx={{
            background: 'linear-gradient(45deg, #a855f7, #ec4899)',
            '&:hover': {
              background: 'linear-gradient(45deg, #9333ea, #db2777)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Tentar Novamente
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        position: 'relative',
      }}
    >
      <BackgroundStars />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <DashboardHeader />

        <Stack direction={isMdUp ? 'row' : 'column'} spacing={4} sx={{ mb: 4 }}>
          <Box flex={1}>
            {apodData ? (
              <ApodCard apodData={apodData} formatDate={formatDate} />
            ) : (
              <Box p={3} textAlign="center">
                <Typography color="text.secondary">
                  Dados da NASA indisponíveis
                </Typography>
              </Box>
            )}
          </Box>

          <Box flex={1}>
            {nextLaunch ? (
              <SpaceXLaunchCard
                nextLaunch={nextLaunch}
                formatDate={formatDate}
                timeLeft={timeLeft}
              />
            ) : (
              <Box p={3} textAlign="center">
                <Typography color="text.secondary">
                  Nenhum lançamento programado
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>

        <Box mt={4}>
          <PlanetCarousel planets={planets} />
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardPage;
