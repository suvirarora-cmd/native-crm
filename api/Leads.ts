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