import { Code, Public } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
// src/components/ui/OrbitaHeader.tsx
import type React from 'react';
import { useNavigate } from 'react-router-dom';

export const OrbitaHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => navigate('/dashboard');

  return (
    <Box textAlign="center" mb={3} sx={{ overflow: 'hidden', width: '100%' }}>
      {/* Órbitas animadas */}
      <Box
        sx={{
          position: 'relative',
          width: '90px',
          height: '90px',
          margin: '0 auto 0.8rem',
        }}
      >
        {/* Planeta central */}
        <Box
          onClick={handleLogoClick}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #a855f7, #ec4899)',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)',
            animation: 'pulse 2s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translate(-50%, -50%) scale(1.1)',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.8)',
              background: 'linear-gradient(45deg, #9333ea, #db2777)',
            },
            '&:active': {
              transform: 'translate(-50%, -50%) scale(0.95)',
            },
          }}
        >
          <Public
            sx={{
              fontSize: '1.3rem',
              color: 'white',
              animation: 'rotate 10s linear infinite',
            }}
          />
        </Box>

        {/* Órbita 1 */}
        <OrbitBox
          size="60px"
          animation="orbit1 8s linear infinite"
          satelliteProps={{
            top: '-6px',
            size: '12px',
            bg: '#fbbf24',
            content: 'JS',
            fontSize: '7px',
          }}
        />

        {/* Órbita 2 */}
        <OrbitBox
          size="80px"
          animation="orbit2 12s linear infinite"
          satelliteProps={{
            top: '-7px',
            size: '14px',
            bg: '#10b981',
            content: <Code sx={{ fontSize: '8px', color: 'white' }} />,
          }}
        />
      </Box>

      {/* Título */}
      <Typography
        onClick={handleLogoClick}
        variant="h4"
        component="h1"
        fontWeight="bold"
        sx={{
          background: 'linear-gradient(45deg, #c084fc, #f472b6, #a855f7)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            filter: 'brightness(1.2)',
          },
        }}
      >
        Orbita
        <Typography
          component="span"
          sx={{
            color: '#fbbf24',
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
          }}
        >
          JS
        </Typography>
      </Typography>

      {/* Divider com shimmer */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '2px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.5) 20%, rgba(236, 72, 153, 0.8) 50%, rgba(168, 85, 247, 0.5) 80%, transparent 100%)',
          borderRadius: '1px',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.8) 50%, transparent 100%)',
            animation: 'shimmer 3s ease-in-out infinite',
          },
        }}
      />

      <style>
        {`
          @keyframes pulse {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1);
              box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.1);
              box-shadow: 0 0 25px rgba(168, 85, 247, 0.8);
            }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes orbit1 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes orbit2 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
          }
        `}
      </style>
    </Box>
  );
};

// Componente auxiliar para reduzir duplicação
const OrbitBox: React.FC<{
  size: string;
  animation: string;
  satelliteProps: {
    top: string;
    size: string;
    bg: string;
    content: React.ReactNode;
    fontSize?: string;
  };
}> = ({ size, animation, satelliteProps }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: size,
      height: size,
      border: '1px solid rgba(168, 85, 247, 0.3)',
      borderRadius: '50%',
      animation,
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: satelliteProps.top,
        left: '50%',
        transform: 'translateX(-50%)',
        width: satelliteProps.size,
        height: satelliteProps.size,
        borderRadius: '50%',
        backgroundColor: satelliteProps.bg,
        boxShadow: `0 0 8px ${satelliteProps.bg}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: satelliteProps.fontSize || '8px',
        fontWeight: 'bold',
        color: satelliteProps.fontSize ? '#000' : 'white',
        fontFamily: satelliteProps.fontSize ? 'monospace' : 'inherit',
      }}
    >
      {satelliteProps.content}
    </Box>
  </Box>
);
