import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Link,
  Grid,
} from "@mui/material";
import {
  Logout,
  Refresh,
  Launch,
  Science,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface APODData {
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
    patch: { small: string };
    webcast: string;
  };
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [nextLaunch, setNextLaunch] = useState<SpaceXLaunch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const NASA_API_KEY = "DEMO_KEY";

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (nextLaunch) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(nextLaunch.date_utc).getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [nextLaunch]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [apodResponse, spacexResponse] = await Promise.all([
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`),
        fetch("https://api.spacexdata.com/v4/launches/upcoming"),
      ]);

      if (!apodResponse.ok || !spacexResponse.ok) {
        throw new Error("Erro ao carregar dados das APIs");
      }

      const apodResult = await apodResponse.json();
      const spacexResult = await spacexResponse.json();

      setApodData(apodResult);
      if (spacexResult.length > 0) {
        setNextLaunch(spacexResult[0]);
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (loading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Box className="text-center">
          <CircularProgress
            size={60}
            sx={{
              color: "primary.main",
              mb: 2,
            }}
          />
          <Typography variant="h6" className="text-white font-space">
            🚀 Carregando dados do espaço...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Box className="text-center">
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
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 font-sans">
      {/* Background Stars */}
      <Box className="absolute inset-0 overflow-hidden pointer-events-none">
        <Box className="absolute top-10 left-10 w-1 h-1 bg-purple-300 rounded-full animate-ping" />
        <Box className="absolute top-20 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
        <Box className="absolute bottom-20 left-20 w-1 h-1 bg-purple-400 rounded-full animate-ping" />
        <Box className="absolute bottom-10 right-10 w-1 h-1 bg-pink-300 rounded-full animate-pulse" />
        <Box className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
        <Box className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-500 rounded-full animate-ping" />
      </Box>

      <Container maxWidth="xl" className="relative z-10 py-8">
        {/* Header */}
        <Box className="text-center mb-8">
          <Box className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <Box className="flex items-center gap-4">
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  background:
                    "linear-gradient(45deg, #c084fc, #f472b6, #a855f7)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                🚀 Dashboard Espacial
              </Typography>
            </Box>

            <Box className="flex items-center gap-2">
              <Typography variant="body2" className="text-gray-300 mr-4">
                Bem-vindo, {user.name || "Usuário"}!
              </Typography>

              <IconButton
                onClick={fetchData}
                disabled={loading}
                sx={{
                  color: "primary.main",
                  "&:hover": { backgroundColor: "rgba(168, 85, 247, 0.1)" },
                }}
              >
                <Refresh />
              </IconButton>

              <Button
                variant="outlined"
                onClick={handleLogout}
                startIcon={<Logout />}
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                    borderColor: "primary.light",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          <Typography variant="h6" className="text-gray-300">
            Explore o universo com dados da NASA e SpaceX
          </Typography>
        </Box>

        {/* Main Grid */}
        <Grid container spacing={4}>
          {/* NASA APOD Card */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card
              sx={{
                background: "rgba(168, 85, 247, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(168, 85, 247, 0.1)",
                borderRadius: 4,
                height: "100%",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent className="p-6">
                <Box className="flex justify-between items-center mb-4">
                  <Typography
                    variant="h5"
                    className="text-white flex items-center gap-2"
                  >
                    <Science sx={{ color: "primary.main" }} />
                    Imagem do Dia - NASA
                  </Typography>
                  <Chip
                    label="NASA"
                    sx={{
                      background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {apodData && (
                  <Box>
                    {apodData.media_type === "image" ? (
                      <CardMedia
                        component="img"
                        image={apodData.url}
                        alt={apodData.title}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 2,
                          mb: 2,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: 200,
                          borderRadius: 2,
                          mb: 2,
                          overflow: "hidden",
                        }}
                      >
                        <iframe
                          src={apodData.url}
                          title={apodData.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                          }}
                        />
                      </Box>
                    )}

                    <Typography
                      variant="h6"
                      sx={{ color: "primary.main", mb: 1 }}
                    >
                      {apodData.title}
                    </Typography>

                    <Typography variant="body2" className="text-gray-400 mb-3">
                      📅 {formatDate(apodData.date)}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="text-gray-300 leading-relaxed"
                    >
                      {apodData.explanation.length > 200
                        ? `${apodData.explanation.substring(0, 200)}...`
                        : apodData.explanation}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* SpaceX Launch Card */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card
              sx={{
                background: "rgba(168, 85, 247, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(168, 85, 247, 0.1)",
                borderRadius: 4,
                height: "100%",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent className="p-6">
                <Box className="flex justify-between items-center mb-4">
                  <Typography
                    variant="h5"
                    className="text-white flex items-center gap-2"
                  >
                    <Launch sx={{ color: "secondary.main" }} />
                    Próximo Lançamento
                  </Typography>
                  <Chip
                    label="SpaceX"
                    sx={{
                      background: "linear-gradient(45deg, #4ecdc4, #44bd87)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {nextLaunch ? (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "secondary.main", mb: 1 }}
                    >
                      {nextLaunch.name}
                    </Typography>

                    <Typography variant="body2" className="text-gray-400 mb-4">
                      🗓️ {formatDate(nextLaunch.date_utc)}
                    </Typography>

                    {/* Countdown */}
                    <Paper
                      sx={{
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: 2,
                        p: 2,
                        mb: 3,
                      }}
                    >
                      <Grid container spacing={2} className="text-center">
                        <Grid size={3}>
                          <Typography
                            variant="h4"
                            className="text-red-400 font-bold"
                          >
                            {timeLeft.days}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-400"
                          >
                            dias
                          </Typography>
                        </Grid>
                        <Grid size={3}>
                          <Typography
                            variant="h4"
                            className="text-red-400 font-bold"
                          >
                            {timeLeft.hours}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-400"
                          >
                            horas
                          </Typography>
                        </Grid>
                        <Grid size={3}>
                          <Typography
                            variant="h4"
                            className="text-red-400 font-bold"
                          >
                            {timeLeft.minutes}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-400"
                          >
                            min
                          </Typography>
                        </Grid>
                        <Grid size={3}>
                          <Typography
                            variant="h4"
                            className="text-red-400 font-bold"
                          >
                            {timeLeft.seconds}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-400"
                          >
                            seg
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>

                    {nextLaunch.details && (
                      <Typography
                        variant="body2"
                        className="text-gray-300 leading-relaxed mb-4"
                      >
                        {nextLaunch.details.length > 150
                          ? `${nextLaunch.details.substring(0, 150)}...`
                          : nextLaunch.details}
                      </Typography>
                    )}

                    {nextLaunch.links?.webcast && (
                      <Button
                        variant="contained"
                        component={Link}
                        href={nextLaunch.links.webcast}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Visibility />}
                        sx={{
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #5a67d8, #6b46c1)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        📺 Assistir ao Vivo
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    className="text-gray-400 text-center py-8"
                  >
                    Nenhum lançamento programado encontrado
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Stats Cards */}
          <Grid size={12}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    background: "rgba(168, 85, 247, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(168, 85, 247, 0.1)",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <CardContent className="text-center p-6">
                    <Typography variant="h2" className="mb-2">
                      🌍
                    </Typography>
                    <Typography variant="h6" className="text-white mb-1">
                      Terra
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Nosso lar no cosmos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    background: "rgba(168, 85, 247, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(168, 85, 247, 0.1)",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <CardContent className="text-center p-6">
                    <Typography variant="h2" className="mb-2">
                      🌙
                    </Typography>
                    <Typography variant="h6" className="text-white mb-1">
                      Lua
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Satélite natural
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    background: "rgba(168, 85, 247, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(168, 85, 247, 0.1)",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <CardContent className="text-center p-6">
                    <Typography variant="h2" className="mb-2">
                      🔴
                    </Typography>
                    <Typography variant="h6" className="text-white mb-1">
                      Marte
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Planeta vermelho
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
