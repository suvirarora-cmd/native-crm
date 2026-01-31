import { useState } from "react";
import { useNotes } from "../../hooks/notes/useNotes";

type Props = {
  leadId: string;
};

function AddNote({ leadId }: Props) {
  const [text, setText] = useState("");
  const { createNote } = useNotes(leadId);

  const addNote = async () => {
    if (!text.trim()) return;

    await createNote(text);
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a note..."
      />
      <button onClick={addNote}>Add</button>
    </div>
  );
}

export default AddNote;
