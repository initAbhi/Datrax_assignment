import api from './index';
import type { ApiResponse, DashboardMetrics, ChangeRequest, MenuItem, User } from '../types';

export const authService = {
  login: (data: any) => api.post<ApiResponse<{ user: User, token: string }>>('/auth/login', data),
  getMe: () => api.get<ApiResponse<{ user: User }>>('/auth/me'),
};

export const menuItemService = {
  getAll: () => api.get<ApiResponse<MenuItem[]>>('/menu-items'),
};

export const dashboardService = {
  getMetrics: () => api.get<ApiResponse<DashboardMetrics>>('/dashboard/metrics'),
};

export const changeRequestService = {
  create: (data: any) => api.post<ApiResponse<ChangeRequest>>('/change-requests', data),
  getMyRequests: () => api.get<ApiResponse<ChangeRequest[]>>('/change-requests/my-requests'),
  getPending: () => api.get<ApiResponse<ChangeRequest[]>>('/change-requests/pending'),
  getApprovedQueue: () => api.get<ApiResponse<ChangeRequest[]>>('/change-requests/approved'),
  getDetails: (id: string) => api.get<ApiResponse<ChangeRequest>>(`/change-requests/${id}`),
  updateStatus: (id: string, status: 'APPROVED' | 'REJECTED') => 
    api.patch<ApiResponse<ChangeRequest>>(`/change-requests/${id}/status`, { status }),
};
