export type LeadStatus = "new" | "contacted" | "interested" | "converted";
export type LeadSource = "website" | "referral" | "ad" | "manual";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
