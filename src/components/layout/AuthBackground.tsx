import React from "react";
import { Box, Container } from "@mui/material";

interface AuthBackgroundProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({
  children,
  backgroundImage = "/wallpaper.jpg",
}) => (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 2,
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 15, 35, 0.7)",
        zIndex: 0,
      },
    }}
  >
    <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
      {children}
    </Container>
  </Box>
);
