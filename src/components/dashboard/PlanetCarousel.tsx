import { Box, Typography } from '@mui/material';
import React from 'react';

interface Planet {
  icon: string;
  title: string;
  subtitle: string;
}

interface PlanetCarouselProps {
  planets: Planet[];
}

const PlanetCarousel: React.FC<PlanetCarouselProps> = ({ planets }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      return;
    }

    let animationId: number;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (scrollContainer) {
        const { scrollLeft, scrollWidth } = scrollContainer;

        const halfWidth = scrollWidth / 2;
        if (scrollLeft >= halfWidth) {
          scrollContainer.scrollLeft = scrollLeft - halfWidth;
        } else {
          scrollContainer.scrollLeft += scrollSpeed;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', py: 2 }}>
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          px: 1,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {[...planets, ...planets].map((planet, index) => (
          <Box
            key={`${planet.title}-${index}`}
            sx={{
              minWidth: { xs: 220, sm: 250, md: 280 },
              flex: '0 0 auto',
            }}
          >
            <PlanetCard {...planet} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const PlanetCard: React.FC<Planet> = ({ icon, title, subtitle }) => (
  <Box
    sx={{
      background: 'rgba(168, 85, 247, 0.03)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(168, 85, 247, 0.1)',
      borderRadius: 3,
      p: 3,
      textAlign: 'center',
      height: '100%',
      minHeight: 180,
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
      },
    }}
  >
    <Typography
      variant="h2"
      sx={{
        mb: 2,
        display: 'inline-block',
      }}
    >
      {icon}
    </Typography>
    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subtitle}
    </Typography>
  </Box>
);

export default PlanetCarousel;
