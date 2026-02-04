export const DASHBOARD_TEXT = {
  TITLE: 'Dashboard',
  STATUS_BREAKDOWN: 'Status Breakdown',
};

export const DASHBOARD_STATS = [
  {
    key: 'totalLeads',
    label: 'Total Leads',
    icon: '📇',
    color: '#3B82F6',
  },
  {
    key: 'assignedLeads',
    label: 'Assigned Leads',
    icon: '🧭',
    color: '#8B5CF6',
  },
  {
    key: 'new',
    label: 'New',
    icon: '✨',
    color: '#8B5CF6',
  },
  {
    key: 'contacted',
    label: 'Contacted',
    icon: '📞',
    color: '#F59E0B',
  },
  {
    key: 'interested',
    label: 'Interested',
    icon: '👁️',
    color: '#10B981',
  },
  {
    key: 'converted',
    label: 'Converted',
    icon: '🎉',
    color: '#EC4899',
  },
] as const;
