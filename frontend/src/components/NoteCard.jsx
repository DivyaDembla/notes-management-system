import { FaTrash, FaEdit, FaThumbtack, FaPalette } from "react-icons/fa";

const colors = [
  "white",
  "#FEF7E0",
  "#FFF1E6",
  "#FDECEF",
  "#ECFDF3",
  "#EEF6FF",
  "#F5F0FF",
];

function NoteCard({ note, remove, edit, pin, change }) {
  let doodles = [];

  if (note.doodles) {
    try {
      doodles = JSON.parse(note.doodles);
    } catch {
      doodles = [];
    }
  }

  return (
    <div
      style={{
        background: note.color || "white",
      }}
      className="
rounded-2xl
p-4
md:p-5
mb-6
break-inside-avoid
border
border-gray-200
hover:shadow-md
transition
"
    >
      {doodles.length > 0 && (
        <div
          className="
flex
flex-wrap
gap-2
mb-4
"
        >
          {doodles.map((doodle, index) => (
            <img
              key={index}
              src={doodle}
              alt={`Doodle ${index}`}
              className="
w-28
h-20
sm:w-32
sm:h-24
object-cover
rounded-lg
border
bg-white
"
            />
          ))}
        </div>
      )}

      <div
        className="
flex
justify-between
items-start
mb-3
"
      >
        <h2
          className="
font-semibold
text-base
md:text-lg
"
        >
          {note.title}
        </h2>

        <button
          onClick={() => pin(note.id)}
          className="
hover:text-yellow-500
transition
"
        >
          <FaThumbtack
            className={note.pinned ? "text-yellow-500" : "text-gray-300"}
          />
        </button>
      </div>

      <p
        className="
text-gray-700
whitespace-pre-wrap
"
      >
        {note.content}
      </p>

      <div
        className="
flex
justify-between
items-center
mt-5
"
      >
        <small className="text-gray-400">
          Created: {new Date(note.createdAt).toLocaleDateString()}
          {note.updatedAt &&
            new Date(note.updatedAt).getTime() !==
              new Date(note.createdAt).getTime() && (
              <>
                <br />
                Edited: {new Date(note.updatedAt).toLocaleDateString()}
              </>
            )}
        </small>
      </div>

      <div
        className="
flex
justify-between
items-center
mt-5
"
      >
        <div
          className="
flex
gap-2
"
        >
          <FaPalette
            className="
text-gray-400
"
          />

          {colors.map((c) => (
            <button
              key={c}
              onClick={() => change(note.id, c)}
              style={{
                background: c,
              }}
              className="
w-5
h-5
rounded-full
border
border-gray-200
hover:scale-110
transition
"
            />
          ))}
        </div>

        <div
          className="
flex
gap-3
md:gap-4
"
        >
          <button
            onClick={() => edit(note)}
            className="
hover:text-blue-500
transition
"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => remove(note.id)}
            className="
hover:text-red-500
transition
"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
