import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Header from './components/Header.js';

// Pages
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import DashboardPage from './pages/DashboardPage.js';
import CompanyDetailPage from './pages/CompanyDetailPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import TermsPage from './pages/TermsPage.js';
import PricesPage from './pages/PricesPage.js';
import AcademyPage from './pages/AcademyPage.js';
import ArticlesPage from './pages/ArticlesPage.js';
import AboutPage from './pages/AboutPage.js';
import ContactPage from './pages/ContactPage.js';
import SetupPasswordPage from './pages/SetupPasswordPage.js';

function App() {
  return (
    <AuthProvider>
        <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/setup-password" element={<SetupPasswordPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/:id"
              element={
                <ProtectedRoute>
                  <CompanyDetailPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
    </AuthProvider>
  );
}

export default App; 