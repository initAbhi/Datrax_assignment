import React, { useEffect, useState } from 'react';
import { dashboardService } from '../api/services';
import { Card, CardBody } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import type { DashboardMetrics } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await dashboardService.getMetrics();
        if (response.data.success) {
          setMetrics(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch metrics', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);

  if (loading) return <div className="p-8">Loading metrics...</div>;
  if (!metrics) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Welcome back, {user?.role === 'MANAGER' ? 'Manager' : 'Supervisor'}
      </h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {user?.role === 'MANAGER' ? (
          <>
            <MetricCard title="Total Requests" value={metrics.total || 0} />
            <MetricCard title="Pending" value={metrics.pending || 0} color="text-yellow-600" />
            <MetricCard title="Approved" value={metrics.approved || 0} color="text-green-600" />
            <MetricCard title="Rejected" value={metrics.rejected || 0} color="text-red-600" />
          </>
        ) : (
          <>
            <MetricCard title="Pending Approval" value={metrics.pendingApproval || 0} color="text-yellow-600" />
            <MetricCard title="Approved Today" value={metrics.approvedToday || 0} color="text-green-600" />
            <MetricCard title="Rejected Today" value={metrics.rejectedToday || 0} color="text-red-600" />
          </>
        )}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: number; color?: string }> = ({ title, value, color = 'text-gray-900' }) => (
  <Card>
    <CardBody>
      <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
      <dd className={`mt-1 text-3xl font-semibold ${color}`}>{value}</dd>
    </CardBody>
  </Card>
);
