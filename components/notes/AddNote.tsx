import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { spacing, borderRadius, fontSize } from "../../common/styles/theme";

type Props = {
  onAdd: (text: string) => Promise<boolean>;
};

function AddNote({ onAdd }: Props) {
  const [noteText, setNoteText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (noteText.trim() === "") return;

    setSubmitting(true);
    const ok = await onAdd(noteText);
    setSubmitting(false);

    if (ok) {
      setNoteText("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={noteText}
        onChangeText={setNoteText}
        placeholder="Add a note..."
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <View style={styles.row}>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitting}
          style={[styles.button, submitting && styles.buttonDisabled]}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add Note</Text>
          )}
        </TouchableOpacity>
        {success && <Text style={styles.success}>Note added</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  input: {
    width: "100%",
    minHeight: 80,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    textAlignVertical: "top",
    marginBottom: spacing.sm,
  },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm as any },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontSize: fontSize.sm, fontWeight: "600" },
  success: { marginLeft: spacing.sm, color: "#065F46" },
});

export default AddNote;
