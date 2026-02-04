import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { colors, spacing, borderRadius, fontSize } from '../common/styles/theme';
import { getLeads } from '../api/Leads';
import { Lead, LeadStatus } from '../common/types/Lead';

interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}

export const DashboardStats: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const bgColor = isDark ? colors.dark.background : colors.light.background;
  const cardBg = isDark ? colors.dark.card : colors.light.card;
  const textColor = isDark ? colors.dark.text : colors.light.text;
  const textSecondary = isDark ? colors.dark.textSecondary : colors.light.textSecondary;
  const borderColor = isDark ? colors.dark.border : colors.light.border;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const countByStatus = (status: LeadStatus) => {
    return leads.filter((lead) => lead.status === status).length;
  };

  const stats: StatCard[] = [
    {
      label: 'Total Leads',
      value: leads.length,
      icon: '📇',
      color: '#3B82F6',
    },
    {
      label: 'New',
      value: countByStatus('new'),
      icon: '✨',
      color: '#8B5CF6',
    },
    {
      label: 'Contacted',
      value: countByStatus('contacted'),
      icon: '📞',
      color: '#F59E0B',
    },
    {
      label: 'Interested',
      value: countByStatus('interested'),
      icon: '👁️',
      color: '#10B981',
    },
    {
      label: 'Converted',
      value: countByStatus('converted'),
      icon: '🎉',
      color: '#EC4899',
    },
  ];

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <ActivityIndicator size="large" color={colors[theme].primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>Dashboard</Text>

      {/* Main Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.slice(0, 2).map((stat, index) => (
          <View
            key={index}
            style={[
              styles.statCard,
              {
                backgroundColor: cardBg,
                borderColor,
              },
            ]}
          >
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Status Breakdown */}
      <Text style={[styles.breakdownTitle, { color: textColor }]}>Status Breakdown</Text>
      <View style={styles.statusContainer}>
        {stats.slice(2).map((stat, index) => (
          <View
            key={index}
            style={[
              styles.statusRow,
              {
                backgroundColor: cardBg,
                borderColor,
              },
            ]}
          >
            <View style={styles.statusLabel}>
              <Text style={styles.statusIcon}>{stat.icon}</Text>
              <Text style={[styles.statusText, { color: textColor }]}>{stat.label}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${stat.color}20` }]}>
              <Text style={[styles.statusCount, { color: stat.color }]}>{stat.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  breakdownTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
  statusContainer: {
    gap: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusIcon: {
    fontSize: 20,
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusCount: {
    fontSize: fontSize.base,
    fontWeight: '600',
  },
});
