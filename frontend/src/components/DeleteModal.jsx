function DeleteModal({ close, confirm, darkMode }) {
  return (
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
p-8
w-[90vw]
max-w-[400px]
transition-colors
duration-300
${darkMode ? "bg-[#303134] text-white" : "bg-white text-black"}
`}
      >
        <h2
          className="
text-2xl
font-semibold
"
        >
          Delete Note?
        </h2>

        <p
          className={`
mt-3
${darkMode ? "text-gray-400" : "text-gray-500"}
`}
        >
          This action cannot be undone.
        </p>

        <div
          className="
flex
justify-end
gap-4
mt-8
"
        >
          <button
            onClick={close}
            className={`
px-5
py-2
rounded-xl
transition
${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}
`}
          >
            Cancel
          </button>

          <button
            onClick={confirm}
            className="
px-5
py-2
rounded-xl
bg-red-500
text-white
"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
