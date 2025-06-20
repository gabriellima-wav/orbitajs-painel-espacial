import { Card, CardContent, Typography } from "@mui/material";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function StatsCard({ icon, title, subtitle }: StatsCardProps) {
  return (
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
          {icon}
        </Typography>
        <Typography variant="h6" className="text-white mb-1">
          {title}
        </Typography>
        <Typography variant="body2" className="text-gray-400">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
