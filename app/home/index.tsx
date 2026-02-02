import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { ALERT_STYLES, HOME_MESSAGES } from '../constants/messages';
import { getContainerStyles } from '../styles/containerStyles';
import styles from '../styles/homePage.style';
import { colors, spacing } from '../styles/theme';
const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { isDark } = useTheme();
  const containerStyles = getContainerStyles(isDark);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('./login');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    Alert.alert(
      HOME_MESSAGES.LOGOUT.TITLE,
      HOME_MESSAGES.LOGOUT.MESSAGE,
      [
        { text: HOME_MESSAGES.LOGOUT.CANCEL, style: ALERT_STYLES.CANCEL },
        {
          text: HOME_MESSAGES.LOGOUT.CONFIRM,
          style: ALERT_STYLES.DESTRUCTIVE,
          onPress: async () => {
            await logout();
            router.replace('./login');
          },
        },
      ]
    );
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <View style={containerStyles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Theme Toggle */}
      <View style={containerStyles.themeToggle}>
        <ThemeToggle />
      </View>

      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors[isDark ? 'dark' : 'light'].primary },
            ]}
          >
            <Ionicons
              name={user.role === 'admin' ? 'shield-checkmark' : 'home'}
              size={50}
              color="white"
            />
          </View>
          
          <Text style={[containerStyles.header, { marginBottom: 8 }]}>
            Home
          </Text>
          
          <Text style={[styles.welcomeText, { color: colors[isDark ? 'dark' : 'light'].text }]}>
            Welcome, {user.name}!
          </Text>
          
          {user.role === 'admin' && (
            <View style={styles.adminBadge}>
              <Ionicons name="star" size={16} color="white" />
              <Text style={styles.adminText}>Admin User</Text>
            </View>
          )}
        </View>

        {/* User Info Card */}
        <View style={[containerStyles.card, { marginBottom: 24 }]}>
          <View style={styles.infoRow}>
            <Ionicons
              name="mail"
              size={20}
              color={colors[isDark ? 'dark' : 'light'].textSecondary}
            />
            <Text style={[styles.infoText, { color: colors[isDark ? 'dark' : 'light'].text }]}>
              {user.email}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons
              name="person"
              size={20}
              color={colors[isDark ? 'dark' : 'light'].textSecondary}
            />
            <Text style={[styles.infoText, { color: colors[isDark ? 'dark' : 'light'].text }]}>
              {user.role === 'admin' ? 'Administrator' : 'Regular User'}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: spacing.md }}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            icon={<Ionicons name="log-out" size={20} color={colors[isDark ? 'dark' : 'light'].text} />}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
