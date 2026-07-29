import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { RequestList } from '../pages/RequestList';
import { CreateRequest } from '../pages/CreateRequest';
import { RequestDetails } from '../pages/RequestDetails';
import { MenuList } from '../pages/MenuList';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: ('MANAGER' | 'SUPERVISOR')[] }> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isInitializing } = useAuth();
  
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            
            {/* Manager Routes */}
            <Route path="requests/new" element={
              <ProtectedRoute allowedRoles={['MANAGER']}>
                <CreateRequest />
              </ProtectedRoute>
            } />
            <Route path="requests/my" element={
              <ProtectedRoute allowedRoles={['MANAGER']}>
                <RequestList type="my" />
              </ProtectedRoute>
            } />
            
            {/* Supervisor Routes */}
            <Route path="requests/pending" element={
              <ProtectedRoute allowedRoles={['SUPERVISOR']}>
                <RequestList type="pending" />
              </ProtectedRoute>
            } />
            
            {/* Shared Routes */}
            <Route path="menu" element={<MenuList />} />
            <Route path="requests/approved" element={<RequestList type="approved" />} />
            <Route path="requests/:id" element={<RequestDetails />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
