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

function NoteCard({ note, remove, edit, pin, change, darkMode }) {
  let doodles = [];

  if (note.doodles) {
    try {
      doodles = JSON.parse(note.doodles);
    } catch {
      doodles = [];
    }
  }

  const isCustomColor = note.color && note.color !== "white";

  const textColor = isCustomColor
    ? "text-gray-800"
    : darkMode
      ? "text-white"
      : "text-black";

  const secondaryText = isCustomColor
    ? "text-gray-600"
    : darkMode
      ? "text-gray-400"
      : "text-gray-500";

  return (
    <div
      style={{
        background:
          note.color !== "white"
            ? note.color
            : darkMode
              ? "#303134"
              : "#ffffff",

        boxShadow:
          note.color !== "white"
            ? "0 4px 14px rgba(0,0,0,0.15)"
            : darkMode
              ? "0 2px 10px rgba(0,0,0,0.3)"
              : "0 2px 8px rgba(0,0,0,0.08)",
      }}
      className={`
rounded-2xl
p-4
md:p-5
mb-6
break-inside-avoid
border
transition-all
duration-300
hover:shadow-lg
hover:-translate-y-1
${darkMode ? "border-gray-700" : "border-gray-200"}
`}
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
              className={`
w-28
h-20
sm:w-32
sm:h-24
object-cover
rounded-lg
border
bg-white
${
  isCustomColor
    ? "border-black"
    : darkMode
      ? "border-gray-600"
      : "border-gray-300"
}
`}
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
          className={`
font-semibold
text-base
md:text-lg
${textColor}
`}
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
            className={
              note.pinned
                ? "text-yellow-500"
                : darkMode
                  ? "text-gray-500"
                  : "text-gray-300"
            }
          />
        </button>
      </div>

      <p
        className={`
whitespace-pre-wrap
${secondaryText}
`}
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
        <small className={secondaryText}>
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
          <FaPalette className={darkMode ? "text-gray-500" : "text-gray-400"} />

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
border-gray-300
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
            className={`
transition
hover:text-blue-500
${
  isCustomColor ? "text-gray-700" : darkMode ? "text-gray-300" : "text-gray-500"
}
`}
          >
            <FaEdit />
          </button>

          <button
            onClick={() => remove(note.id)}
            className={`
transition
hover:text-red-500
${
  isCustomColor ? "text-gray-700" : darkMode ? "text-gray-300" : "text-gray-500"
}
`}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
