import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/Public/LoginPage";
import RegisterPage from "./page/Public/RegisterPage";
import { CustomThemeProvider } from "./theme";

export default function UnauthenticatedApp() {
  return (
    <CustomThemeProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </CustomThemeProvider>
  );
}
