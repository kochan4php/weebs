import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import createRoute from "../../helper/createRoute";
import { For } from "../../utils";

const routes = [
  createRoute("/", "Home"),
  createRoute("/anime", "Anime"),
  createRoute("/manga", "Manga"),
  createRoute("/characters", "Characters"),
];

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.asPath.split("/")[1];
  const [inputValue, setInputValue] = useState("");

  const searchFunc = (e) => setInputValue(e.target.value);
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      currentPath === "anime" ||
      currentPath === "search-anime" ||
      currentPath === ""
    )
      router.push(`/search-anime/${inputValue.split(" ").join("%20")}`);
    else if (currentPath === "characters" || currentPath === "search-character")
      router.push(`/search-character/${inputValue.split(" ").join("%20")}`);
    else if (currentPath === "manga" || currentPath === "search-manga")
      router.push(`/search-manga/${inputValue.split(" ").join("%20")}`);
    setInputValue("");
  };

  useEffect(() => {
    const toggle = document.getElementById("toggle");
    const navUl = document.querySelector("nav ul");
    const searchInput = document.querySelector("form input.search-input");

    const openNavMenu = () => {
      toggle.classList.add("hamburger-active");
      navUl.classList.remove("hidden");
      navUl.classList.add("flex");

      setTimeout(() => {
        navUl.classList.add("slide");
      }, 10);
    };

    const closeNavMenu = () => {
      toggle.classList.remove("hamburger-active");
      navUl.classList.remove("slide");

      setTimeout(() => {
        navUl.classList.remove("flex");
        navUl.classList.add("hidden");
      }, 100);
    };

    const toggleFunc = () => {
      if (!navUl.classList.contains("slide")) openNavMenu();
      else closeNavMenu();
    };

    const searchInputKeypressFunc = (e) => {
      if (e.key === "Enter") closeNavMenu();
    };

    const windowClickFunc = (e) => {
      if (e.target !== navUl && e.target !== toggle && e.target !== searchInput)
        closeNavMenu();
    };

    toggle.addEventListener("click", toggleFunc);
    searchInput.addEventListener("keypress", searchInputKeypressFunc);
    window.addEventListener("click", windowClickFunc);

    return () => {
      toggle.removeEventListener("click", toggleFunc);
      searchInput.removeEventListener("keypress", searchInputKeypressFunc);
      window.removeEventListener("click", windowClickFunc);
    };
  }, []);

  return (
    <nav className="bg-gray-900 py-2.5 z-[999] w-full transition-all duration-300 text-white border-b relative border-b-slate-700">
      <div className="container flex justify-between items-center py-1 relative">
        <div>
          <h1 className="text-center bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent font-semibold text-3xl">
            <Link href="/">
              <a className="selection:bg-yellow-700 selection:text-yellow-400">
                Koweebs
              </a>
            </Link>
          </h1>
        </div>
        <ul className="absolute text-lg font-semibold right-0 flex-col bg-slate-800 backdrop-blur-lg h-[70vh] md:h-[40vh] xl:h-[55vh] top-[75px] bottom-0 justify-evenly items-center -z-[199] w-[65%] md:w-[40%] lg:w-[30%] xl:w-[20%] transition-all duration-200 rounded-md border border-slate-600 navbar-nav px-8 md:px-0 hidden">
          <For
            each={routes}
            render={({ path, name }, index) => {
              return (
                <li key={index}>
                  <Link href={path}>
                    <a
                      className={`transition-all duration-200 py-1 border-b-2 border-transparent hover:border-b-slate-200 selection:bg-emerald-500 selection:text-emerald-900 ${
                        currentPath === path.split("/")[1] ? "active" : ""
                      }`}
                    >
                      {name}
                    </a>
                  </Link>
                </li>
              );
            }}
          />
          <li className="md:hidden">
            <form onSubmit={submitHandler}>
              <input
                type="search"
                name="search"
                className={`search-input truncate outline-none px-5 py-1.5 rounded-full bg-slate-700 w-full text-base ring-4 focus:ring-sky-500 transition-all selection:bg-rose-700 selection:text-rose-300 ${
                  currentPath === "anime" ||
                  currentPath === "search-anime" ||
                  currentPath === ""
                    ? ""
                    : currentPath === "manga" || currentPath === "search-manga"
                    ? ""
                    : currentPath === "characters" ||
                      currentPath === "search-character"
                    ? ""
                    : "hidden"
                }`}
                placeholder={
                  currentPath === "anime" ||
                  currentPath === "search-anime" ||
                  currentPath === ""
                    ? "Search Anime"
                    : currentPath === "manga" || currentPath === "search-manga"
                    ? "Search Manga"
                    : "Search Character"
                }
                autoComplete="off"
                value={inputValue}
                onChange={searchFunc}
              />
            </form>
          </li>
        </ul>
        <div className="flex items-center justify-center">
          <div className="hidden md:block mr-4">
            <form onSubmit={submitHandler}>
              <input
                type="search"
                name="search"
                className={`search-input truncate outline-none px-5 py-1 rounded-sm bg-slate-800 text-base ring-2 focus:ring-4 focus:ring-sky-500 transition-all selection:bg-rose-700 selection:text-rose-300 ${
                  currentPath === "anime" ||
                  currentPath === "search-anime" ||
                  currentPath === ""
                    ? ""
                    : currentPath === "manga" || currentPath === "search-manga"
                    ? ""
                    : currentPath === "characters" ||
                      currentPath === "search-character"
                    ? ""
                    : "hidden"
                }`}
                placeholder={
                  currentPath === "anime" ||
                  currentPath === "search-anime" ||
                  currentPath === ""
                    ? "Search Anime"
                    : currentPath === "manga" || currentPath === "search-manga"
                    ? "Search Manga"
                    : "Search Character"
                }
                autoComplete="off"
                value={inputValue}
                onChange={searchFunc}
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
      </div>
    </nav>
  );
};

export default Navbar;
