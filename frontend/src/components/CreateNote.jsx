import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { createNote } from "../services/notesApi";
import { getDeviceId } from "../utils/device";

function CreateNote({ refreshNotes }) {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  async function handleCreate() {
    if (!title.trim()) {
      alert("Title required");

      return;
    }

    try {
      await createNote({
        title,
        content,
        deviceId: getDeviceId(),
      });
      setTitle("");

      setContent("");

      await refreshNotes();
    } catch (err) {
      console.log(
        "CREATE ERROR:",

        err.response?.data || err.message,
      );

      alert("Failed");
    }
  }
  return (
    <div
      className="
w-[92%]
sm:w-[85%]
md:max-w-[600px]
mx-auto
mt-6
bg-white
rounded-2xl
border
border-gray-300
shadow-sm
p-4
"
    >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
w-full
mb-4
outline-none
font-semibold
"
      />

      <textarea
        rows="2"
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="
w-full
outline-none
resize-none
"
      />

      <div
        className="
flex
justify-end
mt-4
"
      >
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
  );
}

export default CreateNote;
