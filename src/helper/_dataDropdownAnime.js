import createRoute from "./createRoute";

const dataDropdownAnime = [
  createRoute("/seasons/now", "Airing Now"),
  createRoute("/seasons/upcoming", "Upcoming Anime"),
  createRoute("/top/anime", "Top Anime"),
];

export default dataDropdownAnime;
