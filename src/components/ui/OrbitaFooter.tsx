import { Copyright, Rocket } from '@mui/icons-material';
import { Box, Container, Divider, Typography } from '@mui/material';
import type React from 'react';

export const OrbitaFooter: React.FC = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto',
      py: 2,
      background:
        'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      position: 'relative',
      borderTop: '1px solid rgba(168, 85, 247, 0.15)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage:
          'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
        zIndex: 0,
      },
    }}
  >
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      {/* Header do Footer */}
      <Box textAlign="center" mb={4}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Rocket sx={{ fontSize: '1.5rem', color: 'primary.main', mr: 1 }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #c084fc, #f472b6, #a855f7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Orbita
            <Typography
              component="span"
              sx={{
                color: '#fbbf24',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 'bold',
              }}
            >
              JS
            </Typography>
          </Typography>
        </Box>
      </Box>

      {/* Divider */}
      <Divider
        sx={{
          my: 3,
          borderColor: 'rgba(168, 85, 247, 0.2)',
          '&::before, &::after': {
            borderColor: 'rgba(168, 85, 247, 0.2)',
          },
        }}
      />

      {/* Copyright */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={{ xs: 2, md: 0 }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          alignItems="center"
        >
          <Copyright sx={{ fontSize: '1rem', mr: 0.5 }} />
          2025 OrbitaJS.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          v1.0.0 • Build #{new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  </Box>
);
