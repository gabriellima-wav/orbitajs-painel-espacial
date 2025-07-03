// src/components/ui/OrbitaHeader.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Public, Code } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const OrbitaHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
   <Box 
      textAlign="center" 
      mb={3} 
      position="relative"
      sx={{
        overflow: "hidden", // Previne rolagem
        width: "100%",
      }}
    >

      {/* Órbitas animadas COMPACTAS */}
      <Box
        sx={{
          position: "relative",
          width: "90px", // Reduzido de 140px
          height: "90px", // Reduzido de 140px
          margin: "0 auto 0.8rem", // Reduzido de 1rem
        }}
      >
        {/* Planeta central MENOR */}
        <Box
          onClick={handleLogoClick}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "32px", // Reduzido de 45px
            height: "32px", // Reduzido de 45px
            borderRadius: "50%",
            background: "linear-gradient(45deg, #a855f7, #ec4899)",
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)", // Reduzido
            animation: "pulse 2s ease-in-out infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translate(-50%, -50%) scale(1.1)",
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.8)",
              background: "linear-gradient(45deg, #9333ea, #db2777)",
            },
            "&:active": {
              transform: "translate(-50%, -50%) scale(0.95)",
            },
          }}
        >
          <Public
            sx={{
              fontSize: "1.3rem", // Reduzido de 1.8rem
              color: "white",
              animation: "rotate 10s linear infinite",
              transition: "transform 0.2s ease",
            }}
          />
        </Box>

        {/* Órbita 1 MENOR */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60px", // Reduzido de 90px
            height: "60px", // Reduzido de 90px
            border: "1px solid rgba(168, 85, 247, 0.3)",
            borderRadius: "50%",
            animation: "orbit1 8s linear infinite",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-6px", // Reduzido de -8px
              left: "50%",
              transform: "translateX(-50%)",
              width: "12px", // Reduzido de 16px
              height: "12px", // Reduzido de 16px
              borderRadius: "50%",
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 8px #fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "7px", // Reduzido de 10px
              fontWeight: "bold",
              color: "#000",
              fontFamily: "monospace",
            }}
          >
            JS
          </Box>
        </Box>

        {/* Órbita 2 MENOR */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80px", // Reduzido de 120px
            height: "80px", // Reduzido de 120px
            border: "1px solid rgba(168, 85, 247, 0.2)",
            borderRadius: "50%",
            animation: "orbit2 12s linear infinite",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-7px", // Reduzido de -10px
              left: "50%",
              transform: "translateX(-50%)",
              width: "14px", // Reduzido de 20px
              height: "14px", // Reduzido de 20px
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 6px #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code
              sx={{
                fontSize: "8px", // Reduzido de 12px
                color: "white",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Título COMPACTO */}
      <Typography
        onClick={handleLogoClick}
        variant="h4" // Mudado de h2 para h4
        component="h1"
        fontWeight="bold"
        sx={{
          background: "linear-gradient(45deg, #c084fc, #f472b6, #a855f7)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 0.5, // Reduzido de 1
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5, // Reduzido de 1
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            filter: "brightness(1.2)",
          },
        }}
      >
        Orbita
        <Typography
          component="span"
          sx={{
            color: "#fbbf24",
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: "bold",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        >
          JS
        </Typography>
      </Typography>

      {/* DIVIDER com shimmer (mantido igual) */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.5) 20%, rgba(236, 72, 153, 0.8) 50%, rgba(168, 85, 247, 0.5) 80%, transparent 100%)",
          borderRadius: "1px",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.8) 50%, transparent 100%)",
            animation: "shimmer 3s ease-in-out infinite",
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
