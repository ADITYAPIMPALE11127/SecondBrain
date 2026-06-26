import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const loadNotes = () => {
    api.get("notes/")
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const createNote = async () => {
    try {
      if (editingId) {
        await api.put(`notes/update/${editingId}/`, {
          title,
          content,
          user: 1,
        });

        setEditingId(null);
      } else {
        await api.post("notes/", {
          title,
          content,
          user: 1,
        });
      }

      setTitle("");
      setContent("");

      loadNotes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>RecallAI</h1>

      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Write note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={createNote}>
      {editingId ? "Update Note" : "Add Note"}
      </button>

      <hr />

      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
<button
  onClick={() => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }}
>
  Edit
</button>
          <button
            onClick={async () => {
              await api.delete(`notes/${note.id}/`);
              loadNotes();
            }}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;