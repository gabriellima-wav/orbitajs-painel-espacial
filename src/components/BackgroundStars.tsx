import { Box } from '@mui/material';

export default function BackgroundStars() {
  return (
    <Box className="absolute inset-0 overflow-hidden pointer-events-none">
      <Box className="absolute top-10 left-10 w-1 h-1 bg-purple-300 rounded-full animate-ping" />
      <Box className="absolute top-20 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
      <Box className="absolute bottom-20 left-20 w-1 h-1 bg-purple-400 rounded-full animate-ping" />
      <Box className="absolute bottom-10 right-10 w-1 h-1 bg-pink-300 rounded-full animate-pulse" />
      <Box className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
      <Box className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-500 rounded-full animate-ping" />
    </Box>
  );
}
