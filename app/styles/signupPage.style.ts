import { StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from './theme';

export const getSignupStyles = (isDark: boolean) =>
  StyleSheet.create({
    linkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.lg,
    },
    linkText: {
      fontSize: fontSize.sm,
      color: colors[isDark ? 'dark' : 'light'].textSecondary,
    },
    linkButton: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      color: colors[isDark ? 'dark' : 'light'].primary,
    },
  });

export default getSignupStyles;
