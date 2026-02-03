import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { authAPI } from '../../api/auth';
import { LoginData, LoginScreenProps } from '../../common/types/auth';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { COMMON_COLORS, ICON_NAMES, ICON_SIZES, KEYBOARD_BEHAVIOR, PLATFORMS, STATUS_BAR_STYLES, THEME_MODES } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';
import { commonStyles } from '../styles/commonStyles';
import { getContainerStyles } from '../styles/containerStyles';
import { getLoginStyles } from '../styles/loginPage.style';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const containerStyles = getContainerStyles(isDark);
  const styles = getLoginStyles(isDark);
  const themeMode = isDark ? THEME_MODES.DARK : THEME_MODES.LIGHT;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setLoading(true);
      const response = await authAPI.login(data);
      await login(response.access_token, response.user);
      router.replace('./home');
    } catch (error: any) {
      Alert.alert(
        AUTH_MESSAGES.ERRORS.LOGIN_FAILED,
        error.response?.data?.message || AUTH_MESSAGES.ERRORS.INVALID_CREDENTIALS
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === PLATFORMS.IOS ? KEYBOARD_BEHAVIOR.PADDING : KEYBOARD_BEHAVIOR.HEIGHT}
      style={containerStyles.container}
    >
      <StatusBar style={isDark ? STATUS_BAR_STYLES.LIGHT : STATUS_BAR_STYLES.DARK} />
      <ScrollView
        contentContainerStyle={containerStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={commonStyles.flexCenter}>
          {/* Theme Toggle */}
          <View style={containerStyles.themeToggle}>
            <ThemeToggle />
          </View>

          {/* Header Section */}
          <View style={containerStyles.headerSection}>
            <View style={containerStyles.iconCircle}>
              <Ionicons name={ICON_NAMES.LOCK_CLOSED} size={ICON_SIZES.EXTRA_LARGE} color={COMMON_COLORS.WHITE} />
            </View>
            <Text style={containerStyles.header}>Welcome Back</Text>
            <Text style={containerStyles.subheader}>Sign in to continue</Text>
          </View>

          {/* Login Card */}
          <View style={containerStyles.card}>
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, value } }: { field: { onChange: (text: string) => void; value: string } }) => (
                <CustomInput
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                  required
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, value } }: { field: { onChange: (text: string) => void; value: string } }) => (
                <CustomInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your password"
                  secureTextEntry
                  error={errors.password?.message}
                  required
                />
              )}
              name="password"
            />

            <CustomButton
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              icon={<Ionicons name={ICON_NAMES.LOG_IN} size={ICON_SIZES.MEDIUM} color={COMMON_COLORS.WHITE} />}
            />

            {/* Sign Up Link */}
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>
                Don&apos;t have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.linkButton}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
