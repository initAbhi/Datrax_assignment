import api from './index';

export const authService = {
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const menuItemService = {
  getAll: () => api.get('/menu-items'),
};

export const dashboardService = {
  getMetrics: () => api.get('/dashboard/metrics'),
};

export const changeRequestService = {
  create: (data: any) => api.post('/change-requests', data),
  getMyRequests: () => api.get('/change-requests/my-requests'),
  getPending: () => api.get('/change-requests/pending'),
  getApprovedQueue: () => api.get('/change-requests/approved'),
  getDetails: (id: string) => api.get(`/change-requests/${id}`),
  updateStatus: (id: string, status: 'APPROVED' | 'REJECTED') => 
    api.patch(`/change-requests/${id}/status`, { status }),
};
