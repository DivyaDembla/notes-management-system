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
      className="
min-h-screen
bg-[#f1f3f4]
"
    >
      <Navbar search={search} setSearch={setSearch} />

      <CreateNote refreshNotes={loadNotes} />

      <NotesGrid
        notes={filtered}
        remove={askDelete}
        edit={edit}
        pin={pin}
        change={color}
      />

      {selected && (
        <EditModal
          note={selected}
          close={() => setSelected(null)}
          refresh={loadNotes}
        />
      )}

      {deleteId && (
        <DeleteModal close={() => setDeleteId(null)} confirm={remove} />
      )}

      {deleteId && (
        <DeleteModal close={() => setDeleteId(null)} confirm={remove} />
      )}
    </div>
  );
}

export default Home;
