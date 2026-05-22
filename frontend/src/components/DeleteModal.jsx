function DeleteModal({ close, confirm }) {
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
        className="
bg-white
rounded-2xl
p-8
w-[400px]
"
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
          className="
mt-3
text-gray-500
"
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
            className="
px-5
py-2
rounded-xl
border
"
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
