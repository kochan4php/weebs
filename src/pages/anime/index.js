import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ErrorMessage,
  MainCard,
  TitleSection,
  Loading,
  Dropdown,
} from "../../components";
import JIKAN_API from "../../config/Jikan";
import { selectedAnime, titleAnime } from "../../store";

const dataDropdown = [
  { path: "/seasons/now", name: "Airing Now" },
  { path: "/seasons/upcoming", name: "Upcoming Anime" },
  { path: "/top/anime", name: "Top Anime" },
];

const Anime = () => {
  const [anime, setAnime] = useRecoilState(selectedAnime);
  const [title, setTitle] = useRecoilState(titleAnime);

  const [jikanAnime, setJikanAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (selectedAnime) => {
    const requestAnime = await fetch(`${JIKAN_API}${selectedAnime}`);
    const responseAnime = await requestAnime.json();
    setJikanAnime(responseAnime.data);
    setIsLoading(false);
  };

  const clickHandler = (e) => {
    setTitle(e.target.innerText);
    setAnime(e.target.dataset.value);
  };

  useEffect(() => {
    getData(anime);
  }, [anime, title]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 pt-4 pb-8 min-h-screen">
      <div className="container flex justify-between items-center pt-4 pb-7">
        {!isLoading && (
          <>
            <TitleSection>{title}</TitleSection>
            <Dropdown dataDropdown={dataDropdown} onClick={clickHandler} />
          </>
        )}
      </div>
      <div className="container px-0 lg:px-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {jikanAnime ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
                {jikanAnime.map(({ mal_id, images, title, score }) => {
                  if (mal_id === 51994 || mal_id === 26111) return;

                  return (
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
                  );
                })}
              </div>
            ) : (
              <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Anime;
