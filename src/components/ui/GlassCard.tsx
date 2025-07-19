import { Paper, type PaperProps } from '@mui/material';

interface GlassCardProps extends PaperProps {
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  sx,
  ...props
}) => (
  <Paper
    elevation={24}
    sx={{
      p: 4,
      borderRadius: 4,
      background: 'rgba(168, 85, 247, 0.08)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(168, 85, 247, 0.15)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      ...sx,
    }}
    {...props}
  >
    {children}
  </Paper>
);
