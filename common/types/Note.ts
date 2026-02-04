import type { User } from "./auth";
export interface Note {
  _id: string;
  text: string;
  leadId: string;
  createdBy: User;
  createdAt: string;
}
