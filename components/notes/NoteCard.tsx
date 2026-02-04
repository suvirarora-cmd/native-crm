import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
} from "../../common/styles/theme";

const NoteCard = ({
  author,
  text,
  time,
}: {
  author: string;
  text: string;
  time: string;
}) => {
  const initial = author ? author.charAt(0).toUpperCase() : "?";
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.leftRow}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View>
            <Text style={[styles.author, { color: theme.text }]}>{author}</Text>
            <Text style={[styles.time, { color: theme.textSecondary }]}>
              {time}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.body, { color: theme.text }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: spacing.sm,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm as any,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  avatarText: {
    color: "#fff",
    fontWeight: fontWeight.semibold as any,
    fontSize: fontSize.base,
  },
  author: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium as any,
  },
  time: {
    fontSize: fontSize.xs,
  },
  body: {
    fontSize: fontSize.base,
    lineHeight: 20,
  },
});

export default NoteCard;
