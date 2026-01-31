import { api } from "./client";

export const notesApi = {
  getByLead(leadId: string) {
    return api.get(`/leads/${leadId}/notes`);
  },

  create(leadId: string, text: string) {
    return api.post(`/leads/${leadId}/notes`, { text });
  },
};
