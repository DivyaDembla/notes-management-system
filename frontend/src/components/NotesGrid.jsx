import NoteCard from "./NoteCard";

function NotesGrid({ notes, remove, edit, pin, change, darkMode }) {
  if (notes.length === 0) {
    return (
      <div
        className="
text-center
mt-24
"
      >
        <h2
          className="
text-3xl
text-gray-400
"
        >
          No Notes Yet
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
columns-1
sm:columns-2
lg:columns-3
2xl:columns-4
gap-6
px-4
md:px-10
pt-10
space-y-6
"
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          remove={remove}
          edit={edit}
          pin={pin}
          change={change}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
