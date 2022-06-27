import createRoute from "./createRoute";

const routesManga = (id) => [
  createRoute(`/manga/${id}/details`, "Details"),
  createRoute(`/manga/${id}/characters`, "Characters"),
  createRoute(`/manga/${id}/stats`, "Stats"),
  createRoute(`/manga/${id}/reviews`, "Reviews"),
  createRoute(`/manga/${id}/pictures`, "Pictures"),
  createRoute(`/manga/${id}/recommendations`, "Recommendations"),
];

export default routesManga;
