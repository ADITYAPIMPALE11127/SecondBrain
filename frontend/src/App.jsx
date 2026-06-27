import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
const [darkMode, setDarkMode] = useState(false);
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
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <h1>Second Brain</h1>
<button
  className="mode-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
      <div className="input-box">

        <input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="save-btn"
          onClick={createNote}
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>

      </div>

      <div className="notes-grid">

        {notes.map((note) => (
          <div className="note" key={note.id}>

            <h3>{note.title}</h3>

            <p>{note.content}</p>

            <div className="actions">

              <button
                className="edit-btn"
                onClick={() => {
                  setEditingId(note.id);
                  setTitle(note.title);
                  setContent(note.content);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={async () => {
                  await api.delete(`notes/${note.id}/`);
                  loadNotes();
                }}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default App;