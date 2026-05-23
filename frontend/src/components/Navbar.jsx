import { FaSearch } from "react-icons/fa";

import { MdOutlineStickyNote2 } from "react-icons/md";

function Navbar({ search, setSearch }) {
  return (
    <header
      className="
bg-white
shadow-sm
px-5
md:px-10
py-4
flex
flex-col
md:flex-row
gap-4
md:gap-0
justify-between
items-center
"
    >
      <div
        className="
flex
items-center
gap-3
"
      >
        <div
          className="
bg-yellow-400
p-2
rounded-xl
"
        >
          <MdOutlineStickyNote2 size={24} />
        </div>

        <h1
          className="
text-3xl
font-semibold
"
        >
          Noted
        </h1>
      </div>

      <div
        className="
flex
items-center
gap-3
bg-gray-100
px-5
py-3
rounded-2xl
w-full
md:w-[600px]
lg:w-[700px]
"
      >
        <FaSearch
          className="
text-gray-400
"
        />

        <input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
bg-transparent
outline-none
w-full
"
        />
      </div>
    </header>
  );
}

export default Navbar;
