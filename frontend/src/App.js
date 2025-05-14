import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import LoginPage from './pages/LoginPage.js';
import HomePage from './pages/HomePage.js';
import DashboardPage from './pages/DashboardPage.js';
import CompanyDetailPage from './pages/CompanyDetailPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <AuthProvider>
      <div className="app overflow-x-hidden">
        <Header />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/companies/:id" 
              element={
                <ProtectedRoute>
                  <CompanyDetailPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App; 