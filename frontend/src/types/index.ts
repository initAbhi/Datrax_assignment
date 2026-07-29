export * from './enums';

export enum UserRole {
  MANAGER = 'MANAGER',
  SUPERVISOR = 'SUPERVISOR',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  currentPrice: number | null;
  currentAvailability: boolean;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChangeRequest {
  id: string;
  requestNumber: string;
  itemId: string;
  item: MenuItem;
  changeType: string;
  oldValue: string | null;
  newValue: string;
  reason: string;
  status: RequestStatus;
  createdById: string;
  createdBy: User;
  approvedById: string | null;
  approvedBy: User | null;
  createdAt: string;
  updatedAt: string;
  approvedAt: string | null;
}

export interface DashboardMetrics {
  total?: number;
  pending?: number;
  approved?: number;
  rejected?: number;
  pendingApproval?: number;
  approvedToday?: number;
  rejectedToday?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}
