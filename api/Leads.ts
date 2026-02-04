import { ApiResponse, Lead } from '../common/types/Lead';

import client from './client';

export const getLeads = async () => {
  
  const response = await client.get<ApiResponse<Lead[]>>('/leads?limit=100');
  return response.data.data;
};

export const getLead = async (id: string) => {
  const response = await client.get<ApiResponse<Lead>>(`/leads/${id}`);
  return response.data.data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const response = await client.patch<ApiResponse<Lead>>(`/leads/${id}`, { status });
  return response.data.data;
};

export interface LeadsDashboardStats {
  totalLeads: number;
  leadsByStatus: {
    new: number;
    contacted: number;
    interested: number;
    converted: number;
  };
  assignedLeads: number;
  convertedLeads: number;
}

export const getLeadsDashboard = async () => {
  const response = await client.get<ApiResponse<LeadsDashboardStats>>('/leads/dashboard');
  return response.data.data;
};
