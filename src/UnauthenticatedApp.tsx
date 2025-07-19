import ForgotPasswordPage from '@/page/Public/ForgotPasswordPage';
import LoginPage from '@/page/Public/LoginPage';
import RegisterPage from '@/page/Public/RegisterPage';
import { CustomThemeProvider } from '@/theme';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function UnauthenticatedApp() {
  return (
    <CustomThemeProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </CustomThemeProvider>
  );
}
