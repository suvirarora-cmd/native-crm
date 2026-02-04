import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { colors } from "../common/styles/theme";
import { getLeadsDashboard } from "../api/Leads";
import styles from "../common/styles/dashboardStats.style";
import { DASHBOARD_STATS, DASHBOARD_TEXT } from "../common/constants";
import { useFocusEffect } from "@react-navigation/native";

interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}

export const DashboardStats: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [statsData, setStatsData] = useState({
    totalLeads: 0,
    leadsByStatus: {
      new: 0,
      contacted: 0,
      interested: 0,
      converted: 0,
    },
    assignedLeads: 0,
    convertedLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  const bgColor = isDark ? colors.dark.background : colors.light.background;
  const cardBg = isDark ? colors.dark.card : colors.light.card;
  const textColor = isDark ? colors.dark.text : colors.light.text;
  const textSecondary = isDark
    ? colors.dark.textSecondary
    : colors.light.textSecondary;
  const borderColor = isDark ? colors.dark.border : colors.light.border;

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLeadsDashboard();
      setStatsData({
        totalLeads: data?.totalLeads ?? 0,
        leadsByStatus: {
          new: data?.leadsByStatus?.new ?? 0,
          contacted: data?.leadsByStatus?.contacted ?? 0,
          interested: data?.leadsByStatus?.interested ?? 0,
          converted: data?.leadsByStatus?.converted ?? 0,
        },
        assignedLeads: data?.assignedLeads ?? 0,
        convertedLeads: data?.convertedLeads ?? 0,
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useFocusEffect(
    useCallback(() => {
      fetchDashboard();
    }, [fetchDashboard]),
  );

  const stats: StatCard[] = DASHBOARD_STATS.map((stat) => {
    const value =
      stat.key === "totalLeads"
        ? statsData.totalLeads
        : stat.key === "assignedLeads"
          ? statsData.assignedLeads
          : statsData.leadsByStatus[stat.key];

    return {
      label: stat.label,
      value,
      icon: stat.icon,
      color: stat.color,
    };
  });

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <ActivityIndicator size="large" color={colors[theme].primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        {DASHBOARD_TEXT.TITLE}
      </Text>

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
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: textSecondary }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Status Breakdown */}
      <Text style={[styles.breakdownTitle, { color: textColor }]}>
        {" "}
        {DASHBOARD_TEXT.STATUS_BREAKDOWN}
      </Text>
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
              <Text style={[styles.statusText, { color: textColor }]}>
                {stat.label}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: `${stat.color}20` },
              ]}
            >
              <Text style={[styles.statusCount, { color: stat.color }]}>
                {stat.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
