import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../action";
import {
  AlertWarning,
  Loading,
  MainCard,
  TitleSection,
} from "../../components";
import { For, RenderIfFalse, RenderIfTrue } from "../../utils";

const { getAnimeSearch } = action;

const SearchAnime = () => {
  const router = useRouter();
  const { inputValue } = router.query;
  const value = inputValue?.split(" ")?.join("%20");

  const [resultAnime, setResultAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (keyword) => {
    const responseAnime = await getAnimeSearch(keyword);
    if (responseAnime !== undefined) {
      setResultAnime(responseAnime);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else setIsLoading(false);
  };

  useEffect(() => {
    getData(value);
  }, [inputValue, value]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 pt-4 pb-8 min-h-screen">
      <div className="container flex items-center pt-4 pb-6">
        <TitleSection>Result of {inputValue}</TitleSection>
      </div>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container px-0 lg:px-4">
          <RenderIfTrue isTrue={resultAnime.length > 0}>
            <div className="sm:flex items-center mb-4 py-4 hidden">
              <div className="flex-grow h-px bg-gray-400"></div>
              <h1 className="flex-shrink text-slate-400 px-4 font-semibold text-2xl md:text-3xl pb-2 selection:bg-emerald-500 selection:text-emerald-900">
                Anime of {inputValue}
              </h1>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            <div className="mb-4 py-4 sm:hidden">
              <h1 className="text-2xl text-center selection:bg-emerald-500 selection:text-emerald-900 text-slate-400">
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
        </div>
        <RenderIfFalse isFalse={resultAnime.length > 0}>
          <AlertWarning
            message={`Anime yang kamu cari tidak ada. Mungkin anime yang berjudul ${inputValue} memang tidak ada atau kamu memasukkan keyword yang salah.`}
          />
        </RenderIfFalse>
      </RenderIfFalse>
    </section>
  );
};

export default SearchAnime;
