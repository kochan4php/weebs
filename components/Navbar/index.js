import { useEffect } from "react";
import Link from "next/link";

const routes = [
  { path: "/", name: "Home" },
  { path: "/anime", name: "Anime" },
  { path: "/novel", name: "Novel" },
  { path: "/characters", name: "Characters" },
];

const Navbar = () => {
  useEffect(() => {
    const toggle = document.getElementById("toggle");
    const navUl = document.querySelector("nav ul");
    const inputSearch = document.getElementById("input-search");

    toggle.addEventListener("click", function () {
      this.classList.toggle("hamburger-active");
      navUl.classList.toggle("slide");
      navUl.classList.toggle("navbar-nav");
    });

    window.addEventListener("click", function (e) {
      if (
        e.target !== navUl &&
        e.target !== toggle &&
        e.target !== inputSearch
      ) {
        navUl.classList.remove("slide");
        navUl.classList.add("navbar-nav");
        toggle.classList.remove("hamburger-active");
      }
    });
  }, []);

  return (
    <nav className="bg-slate-800 py-2.5 z-[999] w-full transition-all duration-300 text-white border-b border-b-transparent relative border-b-slate-600">
      <div className="container flex justify-between items-center py-1 relative">
        <div>
          <h1 className="text-center text-sky-300 font-semibold text-3xl">
            Weebs
          </h1>
        </div>

        <ul className="flex absolute text-lg font-semibold right-0 flex-col bg-slate-800 bg-opacity-60 backdrop-blur-lg h-[70vh] top-[75px] bottom-0 justify-evenly items-center -z-[199] w-[65%] sm:w-[50%] md:w-[40%] transition-all duration-300 rounded-md border border-slate-600 navbar-nav">
          {routes.map(({ path, name }, index) => (
            <li key={index}>
              <Link href={path}>
                <a className="transition-all duration-200 p-[1px] border-b-2 border-transparent hover:border-b-slate-200">
                  {name}
                </a>
              </Link>
            </li>
          ))}
          <li className="sm:hidden">
            <form>
              <input
                type="search"
                id="input-search"
                placeholder="Search anime or manga"
                className="w-44 px-4 py-1 ring rounded-full focus:outline-none focus:ring focus:ring-sky-500 bg-slate-800 truncate"
              />
            </form>
          </li>
        </ul>

        <form className="hidden sm:block">
          <input
            type="search"
            id="input-search"
            placeholder="Search anime or manga"
            className="lg:w-96 sm:w-80 px-4 py-1 ring rounded-full focus:outline-none focus:ring focus:ring-sky-500 bg-slate-800 truncate"
          />
        </form>

        <div className="relative">
          <input
            type="checkbox"
            id="toggle"
            className="absolute w-[30px] h-[30px] z-[999] opacity-0 cursor-pointer"
          />
          <span className="hamburger-line origin-top-right"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line origin-bottom-right"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
