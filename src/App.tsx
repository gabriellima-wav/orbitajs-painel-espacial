import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import { AuthContext } from './context/AuthContext';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { CircularProgress, Box } from "@mui/material";

function App() {
  const auth = useFirebaseAuth();

  if (auth.loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      loading: auth.loading,
      logout: auth.logout
    }}>
      {auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </AuthContext.Provider>
  );
}

export default App;
