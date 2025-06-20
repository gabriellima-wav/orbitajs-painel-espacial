import { Box, Typography, IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";

interface DashboardHeaderProps {
  userName: string;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function DashboardHeader({ userName, onRefresh, isLoading }: DashboardHeaderProps) {
  return (
    <Box className="text-center mb-8">
      <Box className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Box className="flex items-center gap-4">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              background: "linear-gradient(45deg, #c084fc, #f472b6, #a855f7)",
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
            Bem-vindo, {userName}!
          </Typography>

          <IconButton
            onClick={onRefresh}
            disabled={isLoading}
            sx={{
              color: "primary.main",
              "&:hover": { backgroundColor: "rgba(168, 85, 247, 0.1)" },
            }}
          >
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="h6" className="text-gray-300">
        Explore o universo com dados da NASA e SpaceX
      </Typography>
    </Box>
  );
}
