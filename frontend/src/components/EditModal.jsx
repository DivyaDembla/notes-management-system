import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { updateNote } from "../services/notesApi";
import DoodleModal from "./DoodleModal";

function EditModal({ note, close, refresh, darkMode }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const [showDoodle, setShowDoodle] = useState(false);
  const [previewDoodle, setPreviewDoodle] = useState(null);

  const [downloadTimestamp] = useState(() => Date.now());

  const [doodles, setDoodles] = useState(() => {
    try {
      return note.doodles ? JSON.parse(note.doodles) : [];
    } catch {
      return [];
    }
  });

  function removeDoodle(index) {
    setDoodles(doodles.filter((_, i) => i !== index));
  }

  async function save() {
    await updateNote(note.id, {
      title,
      content,
      doodles,
    });

    refresh();
    close();
  }

  return (
    <>
      <div
        className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
z-50
p-4
"
      >
        <div
          className={`
rounded-2xl
p-6
w-full
max-w-[700px]
max-h-[90vh]
overflow-y-auto
transition-colors
duration-300
${darkMode ? "bg-[#303134] text-white" : "bg-white text-black"}
`}
        >
          <h2
            className="
text-2xl
font-semibold
mb-5
"
          >
            Edit Note
          </h2>

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
                    alt=""
                    onClick={() => setPreviewDoodle(doodle)}
                    className="
w-32
h-24
object-cover
rounded-xl
border
cursor-pointer
hover:opacity-90
transition
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

          <button
            onClick={() => setShowDoodle(true)}
            className={`
flex
items-center
gap-2
mb-4
transition
${
  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
}
`}
          >
            <FaPen />
            Add Doodle
          </button>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`
w-full
mb-4
border
p-3
rounded-xl
bg-transparent
outline-none
${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}
`}
          />

          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`
w-full
border
p-3
rounded-xl
bg-transparent
resize-none
outline-none
${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}
`}
          />

          <div
            className="
flex
justify-end
gap-3
mt-5
"
          >
            <button
              onClick={close}
              className={`
px-4
py-2
rounded-xl
transition
${
  darkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-black"
}
`}
            >
              Cancel
            </button>

            <button
              onClick={save}
              className="
bg-yellow-400
hover:bg-yellow-500
px-5
py-2
rounded-xl
transition
text-black
"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {showDoodle && (
        <div
          className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
z-[60]
p-4
"
        >
          <div
            className={`
rounded-2xl
p-4
w-full
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

      {previewDoodle && (
        <div
          className="
fixed
inset-0
bg-black/80
flex
justify-center
items-center
z-[70]
p-4
"
        >
          <div
            className="
bg-white
rounded-2xl
p-4
max-w-[95vw]
max-h-[95vh]
"
          >
            <img
              src={previewDoodle}
              alt=""
              className="
max-w-full
max-h-[70vh]
rounded-xl
"
            />

            <div
              className="
flex
justify-end
gap-3
mt-4
"
            >
              <a
                href={previewDoodle}
                download={`doodle-${downloadTimestamp}.png`}
                className="
bg-green-500
text-white
px-4
py-2
rounded-lg
"
              >
                Download
              </a>

              <button
                onClick={() => setPreviewDoodle(null)}
                className="
bg-gray-300
px-4
py-2
rounded-lg
"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditModal;
