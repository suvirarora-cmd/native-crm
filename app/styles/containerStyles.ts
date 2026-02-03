import { StyleSheet } from 'react-native';
import { borderRadius, colors, fontSize, spacing } from './theme';

export const getContainerStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[isDark ? 'dark' : 'light'].background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xl,
    },
    card: {
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      backgroundColor: colors[isDark ? 'dark' : 'light'].card,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 10,
      marginHorizontal: spacing.md,
      marginVertical: spacing.sm,
    },
    header: {
      fontSize: fontSize.xxxl,
      fontWeight: '700',
      marginBottom: spacing.sm,
      textAlign: 'center',
      color: colors[isDark ? 'dark' : 'light'].text,
    },
    subheader: {
      fontSize: fontSize.sm,
      textAlign: 'center',
      marginBottom: spacing.lg,
      color: colors[isDark ? 'dark' : 'light'].textSecondary,
    },
    headerSection: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
      backgroundColor: colors[isDark ? 'dark' : 'light'].primary,
    },
    iconCircleSecondary: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
      backgroundColor: colors[isDark ? 'dark' : 'light'].secondary,
    },
    themeToggle: {
      position: 'absolute',
      top: 48,
      right: 16,
      zIndex: 10,
    },
    backButton: {
      position: 'absolute',
      top: 48,
      left: 16,
      zIndex: 10,
      padding: spacing.sm,
    },
  });
  