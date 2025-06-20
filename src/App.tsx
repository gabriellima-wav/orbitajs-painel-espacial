import { useMemo } from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import { AuthContext } from "./context/AuthContext";
import { useFirebaseAuth } from "./hooks/useFirebaseAuth";
import { CircularProgress, Box, Typography } from "@mui/material";

function App() {
  const auth = useFirebaseAuth();

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user: auth.user,
      loading: auth.loading,
      logout: auth.logout,
    }),
    [auth.user, auth.loading, auth.logout]
  );

  // Extract loading screen to a separate component
  const renderLoadingScreen = () => (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      <CircularProgress color="primary" size={60} />
      <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
        Carregando dados espaciais...
      </Typography>
    </Box>
  );

  // Early return for loading state
  if (auth.loading) {
    return renderLoadingScreen();
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </AuthContext.Provider>
  );
}

export default App;
