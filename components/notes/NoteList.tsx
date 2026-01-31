import React from "react";
import { useNotes } from "../../hooks/notes/useNotes";
import NoteCard from "./NoteCard";
const NoteList = ({ leadId }: { leadId: string }) => {
  const { notes, loading, error } = useNotes(leadId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes: {error.message}</p>;
  if (notes.length === 0) return <p>No notes found.</p>;
  return (
    <>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          author={note.createdBy.name}
          text={note.text}
          time={note.createdAt}
        />
      ))}
    </>
  );
};

export default NoteList;
