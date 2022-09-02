import JIKAN_API from "@/config/Jikan";
import axios from "axios";
const { get } = axios;

const getAnimeWithPagination = async (selectedAnime, page) =>
  !page
    ? await get(`${JIKAN_API}${selectedAnime}?limit=20`)
    : await get(`${JIKAN_API}${selectedAnime}?page=${page}&limit=20`);

const getMangaWithPagination = async (page = undefined) => {
  const request =
    page === undefined
      ? await fetch(`${JIKAN_API}/top/manga?limit=10`)
      : await fetch(`${JIKAN_API}/top/manga?page=${page}&?limit=10`);
  if (request.ok) return await request.json();
  else return undefined;
};

const getCharactersWithPagination = async (page = undefined) => {
  const request =
    page === undefined
      ? await fetch(`${JIKAN_API}/top/characters?limit=10`)
      : await fetch(`${JIKAN_API}/top/characters?page=${page}&?limit=10`);
  if (request.ok) return await request.json();
  else return undefined;
};

const getAnimeRecommendations = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/recommendations`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getMangaRecommendations = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/recommendations`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getCharacterSearch = async (keyword) => {
  const request = await fetch(`${JIKAN_API}/characters?q=${keyword}&limit=10`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getAnimeSearch = async (keyword) => {
  const request = await fetch(`${JIKAN_API}/anime?q=${keyword}&sfw=false`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getMangaSearch = async (keyword) => {
  const request = await fetch(`${JIKAN_API}/manga?q=${keyword}&sfw=false`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getAnimeVideos = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/videos`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getAnimeCharacters = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/characters`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getMangaCharacters = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/characters`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getAnimeStats = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/statistics`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getMangaStats = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/statistics`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getAnimeReviews = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/reviews`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getMangaReviews = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/reviews`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getDetailAnime = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/full`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getDetailManga = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/full`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getDetailCharacter = async (id) => {
  const request = await fetch(`${JIKAN_API}/characters/${id}/full`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getPhotoAnime = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/pictures`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getPhotoManga = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/pictures`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

const getPhotoCharacter = async (id) => {
  const request = await fetch(`${JIKAN_API}/characters/${id}/pictures`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else return undefined;
};

export default {
  getAnimeWithPagination,
  getCharactersWithPagination,
  getMangaWithPagination,
  getAnimeRecommendations,
  getMangaRecommendations,
  getAnimeSearch,
  getCharacterSearch,
  getMangaSearch,
  getAnimeVideos,
  getAnimeCharacters,
  getMangaCharacters,
  getDetailAnime,
  getAnimeStats,
  getMangaStats,
  getDetailManga,
  getDetailCharacter,
  getPhotoAnime,
  getPhotoManga,
  getPhotoCharacter,
  getAnimeReviews,
  getMangaReviews,
};
