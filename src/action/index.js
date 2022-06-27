import JIKAN_API from "../config/Jikan";

const getAnimeSearch = async (keyword) => {
  const request = await fetch(`${JIKAN_API}/anime?q=${keyword}`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getMangaSearch = async (keyword) => {
  const request = await fetch(`${JIKAN_API}/manga?q=${keyword}`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getAnimeVideos = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/videos`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getAnimeCharacters = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/characters`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getMangaCharacters = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/characters`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getAnimeStats = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/statistics`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getMangaStats = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/statistics`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getAnimeReviews = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/reviews`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getMangaReviews = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/reviews`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getDetailAnime = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/full`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getTopManga = async () => {
  const request = await fetch(`${JIKAN_API}/top/manga`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getDetailManga = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/full`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getDetailCharacter = async (id) => {
  const request = await fetch(`${JIKAN_API}/characters/${id}/full`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getPhotoAnime = async (id) => {
  const request = await fetch(`${JIKAN_API}/anime/${id}/pictures`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getPhotoManga = async (id) => {
  const request = await fetch(`${JIKAN_API}/manga/${id}/pictures`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

const getPhotoCharacter = async (id) => {
  const request = await fetch(`${JIKAN_API}/characters/${id}/pictures`);

  if (request.ok) {
    const response = await request.json();
    return response.data;
  } else {
    return;
  }
};

export default {
  getAnimeSearch,
  getMangaSearch,
  getAnimeVideos,
  getAnimeCharacters,
  getMangaCharacters,
  getDetailAnime,
  getAnimeStats,
  getMangaStats,
  getTopManga,
  getDetailManga,
  getDetailCharacter,
  getPhotoAnime,
  getPhotoManga,
  getPhotoCharacter,
  getAnimeReviews,
  getMangaReviews,
};
