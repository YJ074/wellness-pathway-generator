
import React from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPanelContent = () => {
  const { isAuthenticated } = useAdminAuth();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

const AdminPanel = () => {
  return (
    <AdminAuthProvider>
      <AdminPanelContent />
    </AdminAuthProvider>
  );
};

export default AdminPanel;
