import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import createRoute from "../../helper/createRoute";
import { For } from "../../utils";

const routes = [
  createRoute("/", "Home"),
  createRoute("/about", "About"),
  createRoute("/anime", "Anime"),
  createRoute("/manga", "Manga"),
];

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.asPath.split("/")[1];
  const [inputValue, setInputValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${inputValue.split(" ").join("%20")}`);
    setInputValue("");
  };

  useEffect(() => {
    const navbar = document.querySelector("nav");
    const toggle = document.getElementById("toggle");
    const navUl = document.querySelector("nav ul");
    const searchInput = document.querySelector(".search-input");

    window.onscroll = function () {
      if (window.pageYOffset > 0) {
        navbar.classList.add("navbar-fixed");
      } else {
        navbar.classList.remove("navbar-fixed");
      }
    };

    toggle.addEventListener("click", function () {
      this.classList.toggle("hamburger-active");
      navUl.classList.toggle("slide");
    });

    window.addEventListener("click", function (e) {
      if (
        e.target !== navUl &&
        e.target !== toggle &&
        e.target !== searchInput
      ) {
        navUl.classList.remove("slide");
        toggle.classList.remove("hamburger-active");
      }
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        navUl.classList.remove("slide");
        toggle.classList.remove("hamburger-active");
      }
    });
  }, []);

  return (
    <nav className="bg-gray-900 py-2.5 z-[999] w-full transition-all duration-300 text-white border-b relative border-b-slate-700">
      <div className="container flex justify-between items-center py-1 relative">
        <div>
          <h1 className="text-center bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent font-semibold text-3xl">
            <Link href="/">Weebs</Link>
          </h1>
        </div>

        <ul className="flex absolute text-lg font-semibold right-0 flex-col bg-slate-800 backdrop-blur-lg h-[70vh] md:h-[40vh] xl:h-[55vh] top-[75px] bottom-0 justify-evenly items-center -z-[199] w-[65%] md:w-[40%] lg:w-[30%] xl:w-[20%] transition-all duration-300 rounded-md border border-slate-600 navbar-nav px-8 md:px-0">
          <For
            each={routes}
            render={({ path, name }, index) => (
              <>
                <li key={index}>
                  <Link href={path}>
                    <a
                      className={`transition-all duration-200 py-1.5 border-b-2 border-transparent hover:border-b-slate-200 selection:bg-emerald-500 selection:text-emerald-900 ${
                        currentPath === path.split("/")[1] ? "active" : ""
                      }`}
                    >
                      {name}
                    </a>
                  </Link>
                </li>
              </>
            )}
          />
          <li className="md:hidden">
            <form onSubmit={submitHandler}>
              <input
                type="search"
                name="search"
                className="search-input outline-none px-5 py-1.5 rounded-full bg-slate-700 w-full text-base ring-4 focus:ring-sky-500 transition-all"
                placeholder="Search anime or manga"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
          </li>
        </ul>

        <div className="hidden md:block">
          <form onSubmit={submitHandler}>
            <input
              type="search"
              name="search"
              className="search-input outline-none px-5 py-1.5 rounded-full bg-slate-800 text-base ring-2 focus:ring-sky-500 transition-all"
              placeholder="Search anime or manga"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>

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
