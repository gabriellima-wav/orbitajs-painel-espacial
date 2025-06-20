import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./page/Auth/DashboardPage";
import FavoritesPage from "./page/Auth/FavoritesPage";
import NasaImagePage from "./page/Auth/NasaImagePage";
import SpaceXLaunchesPage from "./page/Auth/SpaceXLaunchesPage";
import NotFoundPage from "./page/Auth/NotFoundPage";
import { CustomThemeProvider } from "./theme";

export default function AuthenticatedApp() {
  return (
    <CustomThemeProvider>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/image-of-day" element={<NasaImagePage />} />
        <Route path="/launches" element={<SpaceXLaunchesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CustomThemeProvider>
  );
}
