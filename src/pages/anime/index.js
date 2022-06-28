import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import action from "../../action";
import {
  Button,
  Dropdown,
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../components";
import createRoute from "../../helper/createRoute";
import { selectedAnime, titleAnime } from "../../store";
import { For, RenderIfFalse, RenderIfTrue } from "../../utils";

const { getAnimeWithPagination } = action;

const dataDropdown = [
  createRoute("/seasons/now", "Airing Now"),
  createRoute("/seasons/upcoming", "Upcoming Anime"),
  createRoute("/top/anime", "Top Anime"),
];

const Anime = () => {
  const router = useRouter();
  const { page } = router.query;

  const [anime, setAnime] = useRecoilState(selectedAnime);
  const [title, setTitle] = useRecoilState(titleAnime);

  const [jikanAnime, setJikanAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const nextPageHandler = () => {
    setIsLoading(true);
    router.push(`/anime/page/2`);
  };

  const getData = async (selectedAnime, page) => {
    const getData = await getAnimeWithPagination(selectedAnime, page);

    if (getData) {
      setJikanAnime(getData.data);
    } else {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const clickHandler = (e) => {
    setTitle(e.target.innerText);
    setAnime(e.target.dataset.value);
    setIsLoading(true);
    router.push("/anime");
  };

  useEffect(() => {
    getData(anime, page);
  }, [anime, title, page]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 pt-4 pb-8 min-h-screen">
      <RenderIfTrue isTrue={isError}>
        <div className="container">
          <ErrorMessage message="Ada sedikit kesalahan pada API nya, coba refresh kembali." />
        </div>
      </RenderIfTrue>
      <RenderIfFalse isFalse={isError}>
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 pt-4 pb-7">
          <TitleSection>{title}</TitleSection>
          <Dropdown dataDropdown={dataDropdown} onClick={clickHandler} />
        </div>
        <div className="container px-0 lg:px-4">
          <RenderIfTrue isTrue={isLoading}>
            <Loading />
          </RenderIfTrue>
          <RenderIfFalse isFalse={isLoading}>
            <RenderIfTrue isTrue={jikanAnime.length > 0}>
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
            <RenderIfFalse isFalse={jikanAnime.length > 0}>
              <div className="container">
                <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
              </div>
            </RenderIfFalse>
          </RenderIfFalse>
        </div>
        <RenderIfFalse isFalse={isError}>
          <div className="container flex gap-6 justify-center my-6">
            <Button fullWidth bgcolor="bg-pink-700" onClick={nextPageHandler}>
              Next &raquo;
            </Button>
          </div>
        </RenderIfFalse>
      </RenderIfFalse>
    </section>
  );
};

export default Anime;
