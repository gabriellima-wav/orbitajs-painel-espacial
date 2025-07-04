import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid"; // Importe o Grid tradicional
import Typography from "@mui/material/Typography";
import { Launch, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface SpaceXLaunchCardProps {
 nextLaunch: {
    name: string;
    date_utc: string;
    details: string | null; // ← Permite null
    links: {
      webcast: string | null; // ← Permite null
      wikipedia?: string | null;
      article?: string | null;
    };
  } | null;
  formatDate: (date: string) => string;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}

export default function SpaceXLaunchCard({
  nextLaunch,
  formatDate,
  timeLeft,
}: SpaceXLaunchCardProps) {
  if (!nextLaunch) {
    return (
      <Typography variant="body1" className="text-gray-400 text-center py-8">
        Nenhum lançamento programado encontrado
      </Typography>
    );
  }

  return (
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

        <Typography variant="h6" sx={{ color: "secondary.main", mb: 1 }}>
          {nextLaunch.name}
        </Typography>

        <Typography variant="body2" className="text-gray-400 mb-4">
          🗓️ {formatDate(nextLaunch.date_utc)}
        </Typography>

        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Grid container spacing={2} className="text-center">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <Grid>
                <Typography variant="h4" className="text-red-400 font-bold">
                  {timeLeft[unit as keyof typeof timeLeft]}
                </Typography>
                <Typography variant="caption" className="text-gray-400">
                  {unit}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Card>

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
            to={nextLaunch.links.webcast}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<Visibility />}
            sx={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              "&:hover": {
                background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            📺 Assistir ao Vivo
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
