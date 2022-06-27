import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const selectedAnime = atom({
  key: "selected-anime",
  default: "/seasons/now",
  effects_UNSTABLE: [persistAtom],
});

const titleAnime = atom({
  key: "title-anime",
  default: "Airing Now",
  effects_UNSTABLE: [persistAtom],
});

const searchedAnimeOrManga = atom({
  key: "searched-anime",
  default: "",
});

export { selectedAnime, titleAnime, searchedAnimeOrManga };
