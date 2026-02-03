import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { COMMON_COLORS, ICON_NAMES, ICON_SIZES, STATUS_BAR_STYLES, THEME_MODES } from '../constants';
import { ALERT_STYLES, HOME_MESSAGES } from '../constants/messages';
import { commonStyles } from '../styles/commonStyles';
import { getContainerStyles } from '../styles/containerStyles';
import { getHomeStyles } from '../styles/homePage.style';
const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { isDark } = useTheme();
  const containerStyles = getContainerStyles(isDark);
  const styles = getHomeStyles(isDark);

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
      <StatusBar style={isDark ? STATUS_BAR_STYLES.LIGHT : STATUS_BAR_STYLES.DARK} />
      
      {/* Theme Toggle */}
      <View style={containerStyles.themeToggle}>
        <ThemeToggle />
      </View>

      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.iconCircle}>
            <Ionicons
              name={user.role === 'admin' ? ICON_NAMES.SHIELD_CHECKMARK : ICON_NAMES.HOME}
              size={ICON_SIZES.JUMBO}
              color={COMMON_COLORS.WHITE}
            />
          </View>
          
          <Text style={containerStyles.header}>
            Home
          </Text>
          
          <Text style={styles.welcomeText}>
            Welcome, {user.name}!
          </Text>
          
          {user.role === 'admin' && (
            <View style={styles.adminBadge}>
              <Ionicons name={ICON_NAMES.STAR} size={ICON_SIZES.SMALL} color={COMMON_COLORS.WHITE} />
              <Text style={styles.adminText}>Admin User</Text>
            </View>
          )}
        </View>

        {/* User Info Card */}
        <View style={[containerStyles.card, commonStyles.marginBottom24]}>
          <View style={styles.infoRow}>
            <Ionicons
              name={ICON_NAMES.MAIL}
              size={ICON_SIZES.MEDIUM}
              color={containerStyles.subheader.color}
            />
            <Text style={styles.infoText}>
              {user.email}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons
              name={ICON_NAMES.PERSON}
              size={ICON_SIZES.MEDIUM}
              color={containerStyles.subheader.color}
            />
            <Text style={styles.infoText}>
              {user.role === 'admin' ? 'Administrator' : 'Regular User'}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={commonStyles.paddingHorizontalMd}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            icon={<Ionicons name={ICON_NAMES.LOG_OUT} size={ICON_SIZES.MEDIUM} color={containerStyles.header.color} />}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
