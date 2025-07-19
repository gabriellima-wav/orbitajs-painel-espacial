import { auth } from '@/firebase/firebaseConfig';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function ApiStatusChecker() {
  const [status, setStatus] = useState({
    firebase: 'pending',
    nasa: 'pending',
    spacex: 'pending',
  });
  const [error, setError] = useState({
    firebase: '',
    nasa: '',
    spacex: '',
  });

  const checkApis = async () => {
    setStatus({ firebase: 'pending', nasa: 'pending', spacex: 'pending' });
    setError({ firebase: '', nasa: '', spacex: '' });

    // Firebase Auth: tenta pegar o usuário atual
    try {
      const user = auth.currentUser;
      setStatus((s) => ({ ...s, firebase: user ? 'ok' : 'ok' }));
    } catch {
      setStatus((s) => ({ ...s, firebase: 'error' }));
      setError((e) => ({ ...e, firebase: 'Erro ao acessar Firebase' }));
    }

    // NASA APOD (Astronomy Picture of the Day)
    try {
      const res = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
      );
      if (res.ok) {
        setStatus((s) => ({ ...s, nasa: 'ok' }));
      } else {
        throw new Error('Erro HTTP');
      }
    } catch {
      setStatus((s) => ({ ...s, nasa: 'error' }));
      setError((e) => ({ ...e, nasa: 'Erro ao acessar NASA API' }));
    }

    // SpaceX Próximo lançamento
    try {
      const res = await fetch('https://api.spacexdata.com/v4/launches/next');
      if (res.ok) {
        setStatus((s) => ({ ...s, spacex: 'ok' }));
      } else {
        throw new Error('Erro HTTP');
      }
    } catch {
      setStatus((s) => ({ ...s, spacex: 'error' }));
      setError((e) => ({ ...e, spacex: 'Erro ao acessar SpaceX API' }));
    }
  };

  useEffect(() => {
    checkApis();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Teste de APIs
        </Typography>
        <Stack spacing={2}>
          <ApiStatusLine
            label="Firebase"
            status={status.firebase}
            error={error.firebase}
          />
          <ApiStatusLine label="NASA" status={status.nasa} error={error.nasa} />
          <ApiStatusLine
            label="SpaceX"
            status={status.spacex}
            error={error.spacex}
          />
        </Stack>
        <Button
          variant="outlined"
          onClick={checkApis}
          sx={{ mt: 3 }}
          disabled={Object.values(status).some((s) => s === 'pending')}
        >
          Re-testar APIs
        </Button>
      </Paper>
    </Box>
  );
}

function ApiStatusLine({
  label,
  status,
  error,
}: {
  label: string;
  status: string;
  error: string;
}) {
  if (status === 'pending') {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={18} />
        <Typography>{label}: Testando...</Typography>
      </Box>
    );
  }
  if (status === 'ok') {
    return <Typography color="success.main">{label}: OK</Typography>;
  }
  return (
    <Alert severity="error">
      {label}: Falha {error && `- ${error}`}
    </Alert>
  );
}
