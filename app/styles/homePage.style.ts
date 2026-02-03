import { StyleSheet } from "react-native";
import { borderRadius, colors, fontSize, fontWeight, spacing } from "./theme";

export const getHomeStyles = (isDark: boolean) =>
  StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    welcomeSection: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    iconCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
      backgroundColor: colors[isDark ? 'dark' : 'light'].primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    welcomeText: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      marginBottom: spacing.sm,
      color: colors[isDark ? 'dark' : 'light'].text,
    },
    adminBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#A78BFA',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      marginTop: spacing.sm,
    },
    adminText: {
      color: '#FFFFFF',
      fontWeight: fontWeight.semibold,
      marginLeft: spacing.sm,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    infoText: {
      marginLeft: spacing.sm + 4,
      fontSize: fontSize.base,
      color: colors[isDark ? 'dark' : 'light'].text,
    },
  });

export default getHomeStyles;
