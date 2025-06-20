import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import BackgroundStars from "../../components/BackgroundStars";
import ApodCard from "../../components/dashboard/ApodCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SpaceXLaunchCard from "../../components/dashboard/SpaceXLaunchCard";
import StatsCard from "../../components/dashboard/StatsCard";
import PlanetCarousel from "../../components/dashboard/PlanetCarousel";
import planets from "../../components/dashboard/PlanetsList";

// Tipos de dados simulados
interface ApodData {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  date: string;
}

interface SpaceXLaunch {
  name: string;
  date_utc: string;
  details: string;
  links: {
    webcast: string;
  };
}

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [nextLaunch, setNextLaunch] = useState<SpaceXLaunch | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [user] = useState<{ name: string }>({ name: "Usuário" });

  // Simulação de fetch de dados
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setApodData({
        title: "Imagem do Dia",
        explanation: "Descrição da imagem do dia",
        url: "https://example.com/image.jpg",
        media_type: "image",
        date: "2025-06-20",
      });
      setNextLaunch({
        name: "Lançamento SpaceX",
        date_utc: "2025-06-21T00:00:00Z",
        details: "Detalhes do lançamento",
        links: { webcast: "https://youtube.com/live" },
      });
      setTimeLeft({ days: 1, hours: 2, minutes: 30, seconds: 15 });
      setLoading(false);
      setError(null);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <CircularProgress size={60} sx={{ color: "primary.main", mb: 2 }} />
        <Typography variant="h6" className="text-white font-space">
          🚀 Carregando dados do espaço...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Typography variant="h5" className="text-red-400 mb-4">
          ⚠️ {error}
        </Typography>
        <Button
          variant="contained"
          onClick={fetchData}
          sx={{
            background: "linear-gradient(45deg, #a855f7, #ec4899)",
            "&:hover": {
              background: "linear-gradient(45deg, #9333ea, #db2777)",
            },
          }}
        >
          Tentar Novamente
        </Button>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 font-sans relative">
      <BackgroundStars />
      <Container maxWidth="xl" className="relative z-10 py-8">
        <DashboardHeader
          userName={user.name || "Usuário"}
          onRefresh={fetchData}
          isLoading={loading}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            {apodData && (
              <ApodCard apodData={apodData} formatDate={formatDate} />
            )}
          </Grid>

          <Grid item xs={12} lg={6}>
            {nextLaunch && (
              <SpaceXLaunchCard
                nextLaunch={nextLaunch}
                formatDate={formatDate}
                timeLeft={timeLeft}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <PlanetCarousel planets={planets} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
