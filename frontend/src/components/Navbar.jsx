import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { MdOutlineStickyNote2 } from "react-icons/md";

function Navbar({ search, setSearch, darkMode, setDarkMode }) {
  return (
    <header
      className={`
shadow-sm
px-3
sm:px-4
md:px-10
py-4
flex
items-center
justify-between
gap-2
sm:gap-4
transition-colors
duration-300
${darkMode ? "bg-[#303134] text-white" : "bg-white text-black"}
`}
    >
      {/* Logo */}
      <div
        className="
flex
items-center
gap-2
sm:gap-3
shrink-0
"
      >
        <div
          className="
bg-yellow-400
p-2
rounded-xl
"
        >
          <MdOutlineStickyNote2 size={22} />
        </div>

        <h1
          className="
text-xl
sm:text-2xl
md:text-3xl
font-semibold
"
        >
          Noted
        </h1>
      </div>

      {/* Right Side */}
      <div
        className="
flex
items-center
gap-2
sm:gap-3
ml-auto
"
      >
        {/* Search */}
        <div
          className={`
flex
items-center
gap-2
sm:gap-3
px-3
sm:px-4
py-2.5
sm:py-3
rounded-2xl
w-[140px]
sm:w-[260px]
md:w-[400px]
lg:w-[550px]
transition-colors
duration-300
${darkMode ? "bg-[#3c4043]" : "bg-gray-100"}
`}
        >
          <FaSearch className="text-gray-400 shrink-0" />

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`
bg-transparent
outline-none
w-full
text-sm
sm:text-base
${
  darkMode
    ? "text-white placeholder:text-gray-300"
    : "text-black placeholder:text-gray-500"
}
`}
          />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`
p-3
rounded-xl
hover:scale-105
transition
shrink-0
${darkMode ? "bg-[#3c4043]" : "bg-gray-100"}
`}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
