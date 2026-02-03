import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { getButtonStyles } from '../app/styles/buttonStyles';
import { useTheme } from '../hooks/useTheme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

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
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : isDark ? '#ffffff' : '#000000'} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, variant === 'primary' ? styles.primaryText : styles.secondaryText]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
