import LogoutButton from '@/components/LogoutButton';
import { navItems } from '@/components/navigation/navItems';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const currentTab = navItems.findIndex(
    (item) => item.path === location.pathname
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(navItems[newValue].path);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  if (isMobile) {
    return (
      <Box
        sx={{
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              onClick={handleMenuClick}
              sx={{ color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>

            <LogoutButton />

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  background: 'rgba(30, 41, 59, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container maxWidth="xl">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tabs
            value={currentTab >= 0 ? currentTab : false}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={false}
            sx={{
              flex: 1,
              '& .MuiTab-root': {
                color: 'text.secondary',
                minHeight: 64,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
              },
            }}
          >
            {navItems.map((item) => (
              <Tab
                key={item.path}
                label={item.label}
                icon={item.icon}
                iconPosition="start"
                sx={{
                  gap: 1,
                  '&:hover': {
                    color: 'primary.light',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </Tabs>

          {/* Botão de logout no desktop */}
          <LogoutButton />
        </Box>
      </Container>
    </Box>
  );
}
