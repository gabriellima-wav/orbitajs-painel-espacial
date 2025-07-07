// src/components/profile/AvatarSection.tsx
import React from "react";
import { 
  Box, 
  Avatar, 
  IconButton, 
  CircularProgress,
  Typography 
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

interface AvatarSectionProps {
  avatar: string;
  displayName: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteAvatar: () => void;
  uploading?: boolean;
}

export default function AvatarSection({ 
  avatar, 
  displayName, 
  onAvatarChange, 
  onDeleteAvatar,
  uploading = false 
}: AvatarSectionProps) {
  return (
    <Box position="relative" textAlign="center">
      <Box position="relative" display="inline-block">
        <Avatar
          src={avatar}
          alt={displayName || "Usuário"}
          sx={{
            width: 100,
            height: 100,
            border: "3px solid",
            borderColor: "primary.main",
            boxShadow: "0 8px 32px rgba(168, 85, 247, 0.3)",
            opacity: uploading ? 0.7 : 1,
            // Otimização para Base64
            objectFit: "cover",
          }}
        />
        
        {uploading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress size={40} sx={{ color: "primary.main" }} />
          </Box>
        )}

        <IconButton
          component="label"
          disabled={uploading}
          sx={{
            position: "absolute",
            bottom: -5,
            right: -5,
            backgroundColor: "primary.main",
            color: "white",
            width: 35,
            height: 35,
            "&:hover": {
              backgroundColor: "primary.dark",
              transform: "scale(1.1)",
            },
            "&:disabled": {
              backgroundColor: "rgba(168, 85, 247, 0.5)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <PhotoCamera fontSize="small" />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp" // Formatos otimizados
            hidden
            onChange={onAvatarChange}
            disabled={uploading}
          />
        </IconButton>

        {avatar && (
          <IconButton
            onClick={onDeleteAvatar}
            disabled={uploading}
            sx={{
              position: "absolute",
              bottom: -5,
              left: -5,
              backgroundColor: "error.main",
              color: "white",
              width: 35,
              height: 35,
              "&:hover": {
                backgroundColor: "error.dark",
                transform: "scale(1.1)",
              },
              "&:disabled": {
                backgroundColor: "rgba(239, 68, 68, 0.5)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        )}
      </Box>
      
      {uploading && (
        <Typography 
          variant="caption" 
          sx={{ 
            color: "primary.main", 
            display: "block", 
            mt: 1 
          }}
        >
          Processando imagem...
        </Typography>
      )}
    </Box>
  );
}
