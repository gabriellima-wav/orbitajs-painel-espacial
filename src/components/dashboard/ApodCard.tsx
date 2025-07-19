import { Science } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';

interface ApodCardProps {
  apodData: {
    title: string;
    explanation: string;
    url: string;
    media_type: string;
    date: string;
  };
  formatDate: (date: string) => string;
}

export default function ApodCard({ apodData, formatDate }: ApodCardProps) {
  return (
    <Card
      sx={{
        background: 'rgba(168, 85, 247, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(168, 85, 247, 0.1)',
        borderRadius: 4,
        height: '100%',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <CardContent className="p-6">
        <Box className="flex justify-between items-center mb-4">
          <Typography
            variant="h5"
            className="text-white flex items-center gap-2"
          >
            <Science sx={{ color: 'primary.main' }} />
            Imagem do Dia - NASA
          </Typography>
          <Chip
            label="NASA"
            sx={{
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>
        {apodData.media_type === 'image' ? (
          <CardMedia
            component="img"
            image={apodData.url}
            alt={apodData.title}
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 200,
              borderRadius: 2,
              mb: 2,
              overflow: 'hidden',
            }}
          >
            <iframe
              src={apodData.url}
              title={apodData.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>
        )}
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
          {apodData.title}
        </Typography>
        <Typography variant="body2" className="text-gray-400 mb-3">
          📅 {formatDate(apodData.date)}
        </Typography>
        <Typography variant="body2" className="text-gray-300 leading-relaxed">
          {apodData.explanation.length > 200
            ? `${apodData.explanation.substring(0, 200)}...`
            : apodData.explanation}
        </Typography>
      </CardContent>
    </Card>
  );
}
