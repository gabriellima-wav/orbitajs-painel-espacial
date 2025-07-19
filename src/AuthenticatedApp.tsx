import NavBar from '@/components/navigation/NavBar';
import { OrbitaFooter } from '@/components/ui/OrbitaFooter';
import { OrbitaHeader } from '@/components/ui/OrbitaHeader';
import DashboardPage from '@/page/Auth/DashboardPage';
import FavoritesPage from '@/page/Auth/FavoritesPage';
import NasaImagePage from '@/page/Auth/NasaImagePage';
import NotFoundPage from '@/page/Auth/NotFoundPage';
import SpaceXLaunchesPage from '@/page/Auth/SpaceXLaunchesPage';
import UserProfilePage from '@/page/Auth/UserProfilePage';
import { CustomThemeProvider } from '@/theme';
import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AuthenticatedApp() {
  return (
    <CustomThemeProvider>
      <Box sx={{ minHeight: '100vh' }}>
        <OrbitaHeader />
        <NavBar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/image-of-day" element={<NasaImagePage />} />
            <Route path="/launches" element={<SpaceXLaunchesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <OrbitaFooter />
        </Box>
      </Box>
    </CustomThemeProvider>
  );
}
