import { useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import { createNote } from "../services/notesApi";
import { getDeviceId } from "../utils/device";
import DoodleModal from "./DoodleModal";

function CreateNote({ refreshNotes, darkMode }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDoodle, setShowDoodle] = useState(false);
  const [doodles, setDoodles] = useState([]);

  async function handleCreate() {
    if (!title.trim()) {
      alert("Title required");
      return;
    }

    try {
      await createNote({
        title,
        content,
        doodles,
        deviceId: getDeviceId(),
      });

      setTitle("");
      setContent("");
      setDoodles([]);

      await refreshNotes();
    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data || err.message);

      alert("Failed");
    }
  }

  function removeDoodle(index) {
    setDoodles(doodles.filter((_, i) => i !== index));
  }

  return (
    <>
      <div
        className={`
w-[92%]
sm:w-[85%]
md:max-w-[600px]
mx-auto
mt-6
rounded-2xl
border
shadow-sm
p-4
transition-colors
duration-300
${darkMode ? "bg-[#303134] border-gray-700" : "bg-white border-gray-300"}
`}
      >
        {doodles.length > 0 && (
          <div
            className="
flex
flex-wrap
gap-3
mb-4
"
          >
            {doodles.map((doodle, index) => (
              <div
                key={index}
                className="
relative
"
              >
                <img
                  src={doodle}
                  alt="Doodle"
                  className="
w-40
h-28
object-cover
rounded-xl
border
"
                />

                <button
                  onClick={() => removeDoodle(index)}
                  className="
absolute
-top-2
-right-2
bg-red-500
text-white
w-6
h-6
rounded-full
flex
items-center
justify-center
text-sm
"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`
w-full
mb-4
outline-none
font-semibold
bg-transparent
${darkMode ? "text-white placeholder:text-gray-400" : "text-black"}
`}
        />
        <textarea
          rows="2"
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`
w-full
outline-none
resize-none
bg-transparent
${darkMode ? "text-white placeholder:text-gray-400" : "text-black"}
`}
        />

        <div
          className="
flex
items-center
justify-between
mt-4
"
        >
          <button
            type="button"
            onClick={() => setShowDoodle(true)}
            className={`
text-lg
transition
${
  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
}
`}
          >
            <FaPen />
          </button>

          <button
            onClick={handleCreate}
            className="
flex
items-center
gap-2
bg-yellow-400
px-4
md:px-5
py-2
rounded-full
"
          >
            <FaPlus />
            Create
          </button>
        </div>
      </div>

      {showDoodle && (
        <div
          className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
"
        >
          <div
            className={`
rounded-2xl
p-3
w-[95vw]
max-w-[600px]
${darkMode ? "bg-[#303134]" : "bg-white"}
`}
          >
            <DoodleModal
              darkMode={darkMode}
              onSave={(image) => setDoodles((prev) => [...prev, image])}
              onClose={() => setShowDoodle(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNote;
