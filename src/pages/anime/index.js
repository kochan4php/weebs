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
import createRoute from "../../helper/createRoute";
import { selectedAnime, titleAnime } from "../../store";
import { RenderIfTrue, RenderIfFalse, For } from "../../utils";

const dataDropdown = [
  createRoute("/seasons/now", "Airing Now"),
  createRoute("/seasons/upcoming", "Upcoming Anime"),
  createRoute("/top/anime", "Top Anime"),
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
      <div className="container flex justRenderIfTruey-between items-center pt-4 pb-7">
        <RenderIfFalse isFalse={isLoading}>
          <TitleSection>{title}</TitleSection>
          <Dropdown dataDropdown={dataDropdown} onClick={clickHandler} />
        </RenderIfFalse>
      </div>
      <div className="container px-0 lg:px-4">
        <RenderIfTrue isTrue={isLoading}>
          <Loading />
        </RenderIfTrue>
        <RenderIfFalse isFalse={isLoading}>
          <RenderIfTrue isTrue={jikanAnime}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
              <For
                each={jikanAnime}
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
          <RenderIfFalse isFalse={jikanAnime}>
            <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
          </RenderIfFalse>
        </RenderIfFalse>
      </div>
    </section>
  );
};

export default Anime;
