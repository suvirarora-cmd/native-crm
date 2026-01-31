import { notesApi } from "@/api/notes";
import { useEffect, useState } from "react";
import 

export function useNotes(leadId: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    notesApi
      .getByLead(leadId)
      .then((res) => setNotes(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [leadId]);

  const createNote = async (text: string) => {
    const res = await notesApi.create(leadId, text);
    setNotes((prev) => [...prev, res.data]);
  };

  return {
    notes,
    loading,
    error,
    createNote,
  };
}
