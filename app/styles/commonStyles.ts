import { StyleSheet } from 'react-native';
import { spacing } from './theme';

/**
 * Common reusable styles to avoid inline styling
 */
export const commonStyles = StyleSheet.create({
  // Flex Layouts
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Padding
  paddingHorizontalMd: {
    paddingHorizontal: spacing.md,
  },
  paddingHorizontalLg: {
    paddingHorizontal: spacing.lg,
  },

  // Margins
  marginBottom8: {
    marginBottom: 8,
  },
  marginBottom24: {
    marginBottom: 24,
  },
});
