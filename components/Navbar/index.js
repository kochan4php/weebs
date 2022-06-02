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

    toggle.addEventListener("click", function () {
      this.classList.toggle("hamburger-active");
      navUl.classList.toggle("slide");
      document.body.classList.toggle("overflow-y-hidden");
    });

    window.addEventListener("click", function (e) {
      if (e.target !== navUl && e.target !== toggle) {
        navUl.classList.remove("slide");
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

        <ul className="flex md:w-[60%] lg:w-[50%] absolute sm:static sm:flex-row sm:bg-transparent sm:justify-evenly md:justify-between lg:justify-evenly text-lg font-semibold right-0 flex-col bg-transparent shadow-md sm:shadow-none shadow-slate-600 sm:bg-opacity-0 sm:backdrop-blur-none backdrop-blur-xl h-[70vh] sm:h-0 top-[75px] bottom-0 justify-evenly items-center -z-[199] sm:z-[99] w-[65%] translate-x-96 sm:translate-x-0 transition-all duration-300 rounded-md border border-slate-600 sm:border-none">
          {routes.map(({ path, name }, index) => (
            <li key={index}>
              <Link href={path}>
                <a className="transition-all duration-200 p-[1px] border-b-2 border-transparent hover:border-b-slate-200">
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div className="sm:hidden relative">
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
