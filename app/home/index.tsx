import React from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { colors } from '../../common/styles/theme';
import { DashboardStats } from '../../components/DashboardStats';
import styles from '../../common/styles/homeScreen.style';
import { HOME_ICONS, HOME_TEXT } from '../../common/constants';

export default function HomeScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const subTextColor = isDark ? '#9CA3AF' : '#6B7280';
  const bgColor = isDark ? '#111827' : '#F9FAFB';
  const cardColor = isDark ? '#1F2937' : '#FFFFFF';

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: 'cancel' },
        { 
          text: "Logout", 
          style: 'destructive', 
          onPress: async () => {
            await logout();
            router.replace('/login');
          } 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <Text style={{ fontSize: 20 }}>{isDark ? HOME_ICONS.THEME_LIGHT : HOME_ICONS.THEME_DARK}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleLogout}>
             <Text style={{ color: colors[theme].error, fontWeight: '600' }}>{HOME_TEXT.LOGOUT}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            {HOME_TEXT.GREETING}, {user?.name?.split(' ')[0] || HOME_TEXT.ROLE_FALLBACK}! 
          </Text>
          <Text style={[styles.subtitle, { color: subTextColor }]}>
            {HOME_TEXT.READY}
          </Text>
          <View style={styles.roleRow}>
            <Text style={styles.roleIcon}>{HOME_ICONS.ROLE}</Text>
            <Text style={[styles.roleText, { color: subTextColor }]}> 
              {user?.role ? `${user.role}` : HOME_TEXT.ROLE_FALLBACK}
            </Text>
          </View>
        </View>

        <DashboardStats />

        <TouchableOpacity 
          onPress={() => router.push('/leads')}
          style={[styles.card, { backgroundColor: cardColor, borderColor: isDark ? '#374151' : '#E5E7EB' }]}
        >
          <View style={styles.iconCircle}>
            <Text style={{ fontSize: 28 }}>{HOME_ICONS.MANAGE_LEADS}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: textColor }]}>{HOME_TEXT.MANAGE_TITLE}</Text>
            <Text style={[styles.cardDesc, { color: subTextColor }]}>
              {HOME_TEXT.MANAGE_DESC}
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: subTextColor }}>{HOME_ICONS.ARROW}</Text>
        </TouchableOpacity>

        <View style={[styles.card, { backgroundColor: cardColor, opacity: 0.6, borderColor: isDark ? '#374151' : '#E5E7EB' }]}>
           <View style={[styles.iconCircle, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]}>
            <Text style={{ fontSize: 28 }}>{HOME_ICONS.NOTES}</Text>
          </View>
          <View>
            <Text style={[styles.cardTitle, { color: textColor }]}>{HOME_TEXT.NOTES_TITLE}</Text>
            <Text style={[styles.cardDesc, { color: subTextColor }]}>{HOME_TEXT.NOTES_DESC}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}