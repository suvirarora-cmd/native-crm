import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { colors } from "../../common/styles/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111827";
  const subTextColor = isDark ? "#9CA3AF" : "#6B7280";
  const bgColor = isDark ? "#111827" : "#F9FAFB";
  const cardColor = isDark ? "#1F2937" : "#FFFFFF";

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <Text style={{ fontSize: 20 }}>{isDark ? "☀️" : "🌙"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Text style={{ color: colors[theme].error, fontWeight: "600" }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            Hello, {user?.name?.split(" ")[0] || "User"}!
          </Text>
          <Text style={[styles.subtitle, { color: subTextColor }]}>
            Ready to close some deals?
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/leads")}
          style={[
            styles.card,
            {
              backgroundColor: cardColor,
              borderColor: isDark ? "#374151" : "#E5E7EB",
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Text style={{ fontSize: 28 }}>📇</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Manage Leads
            </Text>
            <Text style={[styles.cardDesc, { color: subTextColor }]}>
              View pipeline & update status
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: subTextColor }}>→</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.card,
            {
              backgroundColor: cardColor,
              opacity: 0.6,
              borderColor: isDark ? "#374151" : "#E5E7EB",
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: isDark ? "#374151" : "#F3F4F6" },
            ]}
          >
            <Text style={{ fontSize: 28 }}>📝</Text>
          </View>
          <View>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Notes (Coming Soon)
            </Text>
            <Text style={[styles.cardDesc, { color: subTextColor }]}>
              Task Bucket C
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 24 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },

  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 8 },
  subtitle: { fontSize: 16 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  cardDesc: { fontSize: 14 },
});
