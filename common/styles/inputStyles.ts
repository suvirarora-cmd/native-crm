import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, fontSize } from "./theme";

export const getInputStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.md,
      width: "100%",
    },
    label: {
      fontSize: fontSize.sm,
      fontWeight: "500",
      marginBottom: spacing.sm,
      color: colors[isDark ? "dark" : "light"].text,
    },
    required: {
      color: colors[isDark ? "dark" : "light"].error,
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      width: "100%",
      paddingHorizontal: spacing.md,
      paddingVertical: 14,
      borderRadius: borderRadius.md,
      borderWidth: 2,
      fontSize: fontSize.base,
      backgroundColor: isDark ? colors.dark.card : colors.light.card,
      color: colors[isDark ? "dark" : "light"].text,
      borderColor: colors[isDark ? "dark" : "light"].border,
    },
    inputFocused: {
      borderColor: colors[isDark ? "dark" : "light"].borderFocus,
    },
    inputError: {
      borderColor: colors[isDark ? "dark" : "light"].error,
    },
    eyeIcon: {
      position: "absolute",
      right: spacing.md,
      top: 14,
    },
    errorText: {
      fontSize: fontSize.xs,
      color: colors[isDark ? "dark" : "light"].error,
      marginTop: spacing.xs,
    },
  });
