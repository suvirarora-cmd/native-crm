import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COMMON_COLORS, ICON_NAMES, ICON_SIZES } from '../app/constants';
import { borderRadius, colors, spacing } from '../app/styles/theme';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const iconColor = isDark ? COMMON_COLORS.YELLOW : COMMON_COLORS.DARK_GRAY;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.dark.card : colors.light.border },
      ]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isDark ? ICON_NAMES.SUNNY : ICON_NAMES.MOON}
        size={ICON_SIZES.LARGE}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm + 4,
    borderRadius: borderRadius.full,
  },
});
