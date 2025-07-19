import { Person } from '@mui/icons-material';
import { InputAdornment, Stack, TextField } from '@mui/material';

interface ProfileFormProps {
  displayName: string;
  setDisplayName: (value: string) => void;
  email: string;
}

export default function ProfileForm({
  displayName,
  setDisplayName,
  email,
}: ProfileFormProps) {
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      '& fieldset': {
        borderColor: 'rgba(168, 85, 247, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(168, 85, 247, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: 'primary.main',
      },
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
  };

  return (
    <Stack spacing={3} width="100%">
      <TextField
        label="Nome de Exibição"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person sx={{ color: 'primary.main' }} />
            </InputAdornment>
          ),
        }}
        sx={textFieldStyles}
      />

      <TextField
        label="E-mail"
        value={email}
        disabled
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            '& fieldset': {
              borderColor: 'rgba(168, 85, 247, 0.2)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiInputBase-input': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        }}
      />
    </Stack>
  );
}
