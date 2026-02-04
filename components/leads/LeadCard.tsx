import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lead } from '../../common/types/Lead';

interface LeadCardProps {
  lead: Lead;
  onPress: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return '#DBEAFE'; // blue-100
    case 'contacted': return '#FEF3C7'; // yellow-100
    case 'interested': return '#F3E8FF'; // purple-100
    case 'converted': return '#DCFCE7'; // green-100
    default: return '#F3F4F6'; // gray-100
  }
};

const getStatusTextColor = (status: string) => {
  switch (status) {
    case 'new': return '#1E40AF'; // blue-800
    case 'contacted': return '#92400E'; // yellow-800
    case 'interested': return '#6B21A8'; // purple-800
    case 'converted': return '#166534'; // green-800
    default: return '#374151'; // gray-700
  }
};

const LeadCard: React.FC<LeadCardProps> = ({ lead, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(lead._id)} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{lead.name}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(lead.status) }]}>
          <Text style={[styles.badgeText, { color: getStatusTextColor(lead.status) }]}>
            {lead.status}
          </Text>
        </View>
      </View>
      
      <Text style={styles.email}>{lead.email}</Text>
      <Text style={styles.source}>Source: {lead.source}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  source: {
    fontSize: 12,
    color: '#9CA3AF',
    textTransform: 'capitalize',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default LeadCard;