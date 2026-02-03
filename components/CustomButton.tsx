import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getButtonStyles } from '../app/styles/buttonStyles';
import { themeColor } from "../app/styles/theme";
import { CustomButtonProps } from '../common/types/components';
import { useTheme } from '../hooks/useTheme';
import { localStyles } from './styles/buttonStyles';
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
}) => {
  const { isDark } = useTheme();
  const styles = getButtonStyles(isDark);

  const getActivityIndicatorColor = () => {
    if (variant === 'primary') return themeColor.white;
    return isDark ? themeColor.white : themeColor.black;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getActivityIndicatorColor()} />
      ) : (
        <View style={localStyles.iconTextContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, variant === 'primary' ? styles.primaryText : styles.secondaryText]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
