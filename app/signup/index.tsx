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
import { SignupData } from '../../common/types/auth';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useTheme } from '../../hooks/useTheme';
import { COMMON_COLORS, ICON_NAMES, ICON_SIZES, KEYBOARD_BEHAVIOR, PLATFORMS, STATUS_BAR_STYLES, THEME_MODES } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';
import { commonStyles } from '../styles/commonStyles';
import { getContainerStyles } from '../styles/containerStyles';
import { getSignupStyles } from '../styles/signupPage.style';

const SignupScreen: React.FC = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const containerStyles = getContainerStyles(isDark);
  const styles = getSignupStyles(isDark);
  const themeMode = isDark ? THEME_MODES.DARK : THEME_MODES.LIGHT;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      adminSecretKey: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: SignupData) => {
    try {
      setLoading(true);
      const response = await authAPI.signup(data);
      Alert.alert(
        'Success!',
        `${AUTH_MESSAGES.SUCCESS.ACCOUNT_CREATED} ${response.user.role === 'admin' ? AUTH_MESSAGES.SUCCESS.ADMIN_ACCOUNT : AUTH_MESSAGES.SUCCESS.WELCOME}`,
        [{ text: AUTH_MESSAGES.PROMPT.OK, onPress: () => router.push('./home') }]
      );
    } catch (error: any) {
      Alert.alert(
        AUTH_MESSAGES.ERRORS.SIGNUP_FAILED,
        error.response?.data?.message || AUTH_MESSAGES.ERRORS.FAILED_CREATE_ACCOUNT
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

          {/* Back Button */}
          <TouchableOpacity
            style={containerStyles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name={ICON_NAMES.ARROW_BACK} size={ICON_SIZES.XLARGE} color={containerStyles.header.color} />
          </TouchableOpacity>

          {/* Header Section */}
          <View style={containerStyles.headerSection}>
            <View style={containerStyles.iconCircleSecondary}>
              <Ionicons name={ICON_NAMES.PERSON_ADD} size={ICON_SIZES.EXTRA_LARGE} color={COMMON_COLORS.WHITE} />
            </View>
            <Text style={containerStyles.header}>Create Account</Text>
            <Text style={containerStyles.subheader}>Sign up to get started</Text>
          </View>

          {/* Signup Card */}
          <View style={containerStyles.card}>
            <Controller
              control={control}
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, value } }: any) => (
                <CustomInput
                  label="Full Name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your full name"
                  autoCapitalize="words"
                  error={errors.name?.message}
                  required
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, value } }: any) => (
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
              render={({ field: { onChange, value } }: any) => (
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

            <Controller
              control={control}
              rules={{
                required: 'Please confirm your password',
                validate: (value: string) => value === password || 'Passwords do not match',
              }}
              render={({ field: { onChange, value } }: any) => (
                <CustomInput
                  label="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Re-enter your password"
                  secureTextEntry
                  error={errors.confirmPassword?.message}
                  required
                />
              )}
              name="confirmPassword"
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }: any) => (
                <CustomInput
                  label="Admin Secret Key (Optional)"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter admin key"
                  secureTextEntry={false}
                  error={errors.adminSecretKey?.message}
                />
              )}
              name="adminSecretKey"
            />

            <CustomButton
              title="Create Account"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              icon={<Ionicons name={ICON_NAMES.CHECKMARK_CIRCLE} size={ICON_SIZES.MEDIUM} color={COMMON_COLORS.WHITE} />}
            />

            {/* Sign In Link */}
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.linkButton}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
