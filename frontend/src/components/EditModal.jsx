import { useState } from "react";
import { updateNote } from "../services/notesApi";

function EditModal({ note, close, refresh }) {
  const [title, setTitle] = useState(note.title);

  const [content, setContent] = useState(note.content);

  async function save() {
    await updateNote(note.id, {
      title,
      content,
    });

    refresh();

    close();
  }

  return (
    <div
      className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
"
    >
      <div
        className="
bg-white
gap-3
md:gap-4
rounded-2xl
p-6
"
      >
        <h2
          className="
text-2xl
mb-5
"
        >
          Edit Note
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
w-full
mb-4
border
p-3
rounded-xl
"
        />

        <textarea
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
w-full
border
p-3
rounded-xl
"
        />

        <div
          className="
flex
justify-end
gap-4
mt-5
"
        >
          <button onClick={close}>Cancel</button>

          <button
            onClick={save}
            className="
bg-yellow-400
px-5
py-2
rounded-xl
"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
