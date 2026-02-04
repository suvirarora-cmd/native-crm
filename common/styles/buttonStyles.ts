import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, fontSize } from "./theme";

export const getButtonStyles = (isDark: boolean) =>
  StyleSheet.create({
    button: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    primary: {
      backgroundColor: colors[isDark ? "dark" : "light"].primary,
    },
    secondary: {
      backgroundColor: isDark ? colors.dark.card : colors.light.border,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      fontSize: fontSize.base,
      fontWeight: "600",
      textAlign: "center",
    },
    primaryText: {
      color: "#FFFFFF",
    },
    secondaryText: {
      color: colors[isDark ? "dark" : "light"].text,
    },
    iconContainer: {
      marginRight: spacing.sm,
    },
  });
