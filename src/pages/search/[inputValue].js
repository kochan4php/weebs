import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TitleSection,
  Loading,
  ErrorMessage,
  MainCard,
} from "../../components";
import { RenderIfTrue, RenderIfFalse, For } from "../../utils";
import action from "../../action";

const { getAnimeSearch, getMangaSearch } = action;

const SearchAnimeOrManga = () => {
  const router = useRouter();
  const { inputValue } = router.query;
  const value = inputValue?.split(" ")?.join("%20");

  const [resultAnime, setResultAnime] = useState([]);
  const [resultManga, setResultManga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (keyword) => {
    const responseAnime = await getAnimeSearch(keyword);
    const responseManga = await getMangaSearch(keyword);

    if (responseAnime && responseManga) {
      setResultAnime(responseAnime);
      setResultManga(responseManga);
    } else {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData(value);
  }, [inputValue]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 pt-4 pb-8 min-h-screen">
      <div className="container flex items-center pt-4 pb-7">
        <TitleSection centerText>Result of {inputValue}</TitleSection>
      </div>
      <div className="container px-0 lg:px-4">
        <RenderIfTrue isTrue={isLoading}>
          <Loading />
        </RenderIfTrue>
        <RenderIfFalse isFalse={isLoading}>
          <RenderIfTrue isTrue={isError}>
            <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
          </RenderIfTrue>
          <RenderIfFalse isFalse={isError}>
            <RenderIfTrue isTrue={resultAnime.length > 0}>
              <div className="sm:flex items-center mb-4 py-4 hidden">
                <div className="flex-grow h-px bg-gray-400"></div>
                <h1 className="flex-shrink text-slate-300 px-4 font-semibold text-2xl md:text-3xl pb-2 selection:bg-emerald-500 selection:text-emerald-900">
                  Anime of {inputValue}
                </h1>
                <div className="flex-grow h-px bg-gray-400"></div>
              </div>
              <div className="mb-4 py-4 sm:hidden">
                <h1 className="text-2xl text-center selection:bg-emerald-500 selection:text-emerald-900">
                  Anime of {inputValue}
                </h1>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 my-6">
                <For
                  each={resultAnime}
                  render={({ mal_id, images, title, score }) => (
                    <MainCard
                      key={mal_id}
                      path={`/anime/${mal_id}/details`}
                      id={mal_id}
                      image={images?.webp?.large_image_url}
                      title={title}
                      score={score}
                      py="py-5"
                      fontsize="text-base"
                    />
                  )}
                />
              </div>
            </RenderIfTrue>
            <RenderIfTrue isTrue={resultManga.length > 0}>
              <div className="sm:flex items-center mb-4 py-4 hidden">
                <div className="flex-grow h-px bg-gray-400"></div>
                <h1 className="flex-shrink text-slate-300 px-4 font-semibold text-2xl md:text-3xl pb-2 selection:bg-emerald-500 selection:text-emerald-900">
                  Manga of {inputValue}
                </h1>
                <div className="flex-grow h-px bg-gray-400"></div>
              </div>
              <div className="mb-4 py-4 sm:hidden">
                <h1 className="text-2xl text-center selection:bg-emerald-500 selection:text-emerald-900">
                  Manga of {inputValue}
                </h1>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 my-6">
                <For
                  each={resultManga}
                  render={({ mal_id, images, title, score }) => (
                    <MainCard
                      key={mal_id}
                      path={`/manga/${mal_id}/details`}
                      id={mal_id}
                      image={images?.webp?.large_image_url}
                      title={title}
                      score={score}
                      py="py-5"
                      fontsize="text-base"
                    />
                  )}
                />
              </div>
            </RenderIfTrue>
            <RenderIfFalse
              isFalse={resultAnime.length > 0 && resultManga.length > 0}
            >
              <div className="container md:px-0">
                <ErrorMessage message="Anime atau manga yang kamu cari tidak ada, coba masukkan keyword yang benar." />
              </div>
            </RenderIfFalse>
          </RenderIfFalse>
        </RenderIfFalse>
      </div>
    </section>
  );
};

export default SearchAnimeOrManga;
