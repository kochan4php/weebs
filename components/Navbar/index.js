import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const createRoute = (path, name) => ({ path, name });

const routes = [
  createRoute("/", "Home"),
  createRoute("/anime", "Anime"),
  createRoute("/novel", "Novel"),
  createRoute("/characters", "Characters"),
];

const Navbar = () => {
  const router = useRouter();
  console.log(router.asPath.split("/").splice(1)[0]);

  useEffect(() => {
    const toggle = document.getElementById("toggle");
    const navUl = document.querySelector("nav ul");

    toggle.addEventListener("click", function () {
      this.classList.toggle("hamburger-active");
      navUl.classList.toggle("slide");
      navUl.classList.toggle("navbar-nav");
    });

    window.addEventListener("click", function (e) {
      if (e.target !== navUl && e.target !== toggle) {
        navUl.classList.remove("slide");
        navUl.classList.add("navbar-nav");
        toggle.classList.remove("hamburger-active");
      }
    });
  }, []);

  return (
    <nav className="bg-gray-900 py-2.5 z-[999] w-full transition-all duration-300 text-white border-b relative border-b-slate-700">
      <div className="container flex justify-between items-center py-1 relative">
        <div>
          <h1 className="text-center bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent font-semibold text-3xl">
            Weebs
          </h1>
        </div>

        <ul className="flex absolute md:static text-lg font-semibold right-0 flex-col md:flex-row bg-slate-800 bg-opacity-60 md:bg-opacity-100 md:bg-transparent md:border-none md:h-0 md:z-[999] md:backdrop-blur-none backdrop-blur-lg h-[70vh] top-[75px] bottom-0 justify-evenly md:justify-between items-center -z-[199] w-[65%] md:w-[50%] lg:w-[35%] transition-all duration-300 md:rounded-none rounded-md border border-slate-600 navbar-nav">
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

        <div className="relative md:hidden">
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
