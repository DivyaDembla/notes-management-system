import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CreateNote from "../components/CreateNote";
import NotesGrid from "../components/NotesGrid";

import {
  getNotes,
  deleteNote,
  togglePin,
  changeColor,
} from "../services/notesApi";

import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  async function loadNotes() {
    const res = await getNotes();

    setNotes(res.data.sort((a, b) => Number(b.pinned) - Number(a.pinned)));
  }

  async function remove() {
    await deleteNote(deleteId);

    setDeleteId(null);

    loadNotes();
  }

  function askDelete(id) {
    setDeleteId(id);
  }

  async function pin(id) {
    await togglePin(id);

    loadNotes();
  }

  function edit(note) {
    setSelected(note);
  }

  const filtered = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    async function init() {
      await loadNotes();
    }

    init();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  async function color(id, value) {
    await changeColor(id, value);

    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              color: value,
            }
          : n,
      ),
    );
  }

  return (
    <div
      className={`
min-h-screen
transition-colors
duration-300
${darkMode ? "bg-[#202124] text-white" : "bg-[#f1f3f4] text-black"}
`}
    >
      <Navbar
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <CreateNote refreshNotes={loadNotes} darkMode={darkMode} />

      <NotesGrid
        notes={filtered}
        remove={askDelete}
        edit={edit}
        pin={pin}
        change={color}
        darkMode={darkMode}
      />

      {selected && (
        <EditModal
          note={selected}
          close={() => setSelected(null)}
          refresh={loadNotes}
          darkMode={darkMode}
        />
      )}

      {deleteId && (
        <DeleteModal
          close={() => setDeleteId(null)}
          confirm={remove}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default Home;
