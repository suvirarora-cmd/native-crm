import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import type { Note } from "../../common/types/Note";
import { useNotes } from "../../hooks/notes/useNotes";
import NoteCard from "./NoteCard";
import { spacing } from "../../common/styles/theme";

const NoteList = ({
  leadId,
  notes: propNotes,
  loading: propLoading,
  error: propError,
}: {
  leadId: string;
  notes?: Note[];
  loading?: boolean;
  error?: string | null;
}) => {
  const hook = useNotes(leadId);

  const notes = propNotes ?? hook.notes;
  const loading = propLoading ?? hook.loading;
  const error = propError ?? hook.error;

  if (loading)
    return (
      <View style={styles.center}>
        <Text>Loading notes...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  if (!notes || notes.length === 0)
    return (
      <View style={styles.center}>
        <Text>No notes available.</Text>
      </View>
    );

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <NoteCard
          author={item.createdBy?.name ?? "Unknown"}
          text={item.text}
          time={new Date(item.createdAt).toLocaleString()}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: spacing.sm,
    paddingBottom: spacing.xl,
  },
  center: {
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoteList;
