import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import action from "../../../action";
import {
  Button,
  Dropdown,
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../../components";
import dataDropdownAnime from "../../../helper/_dataDropdownAnime";
import { selectedAnime, titleAnime } from "../../../store";
import { For, RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getAnimeWithPagination } = action;

const AnimePagination = () => {
  const router = useRouter();
  const { page } = router.query;

  const [anime, setAnime] = useRecoilState(selectedAnime);
  const [title, setTitle] = useRecoilState(titleAnime);

  const [paginate, setPaginate] = useState({});
  const [jikanAnime, setJikanAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const previousPageHandler = () => {
    setIsLoading(true);
    if (page > 2) router.push(`/anime/page/${parseInt(page) - 1}`);
    else router.push(`/anime`);
  };

  const nextPageHandler = () => {
    setIsLoading(true);
    router.push(`/anime/page/${parseInt(page) + 1}`);
  };

  const getData = async (selectedAnime, page) => {
    const res = await getAnimeWithPagination(selectedAnime, page);
    if (res) {
      setJikanAnime(await res.data);
      setPaginate(await res.pagination);
    } else setIsError(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  };

  const dropdownHandler = (e) => {
    router.push("/anime");
    setTitle(e.target.innerText);
    setAnime(e.target.dataset.value);
  };

  useEffect(() => {
    getData(anime, page);
  }, [anime, title, page]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 py-4 min-h-screen">
      <RenderIfTrue isTrue={isError}>
        <div className="container">
          <ErrorMessage message="Ada sedikit kesalahan pada API nya, coba refresh kembali." />
        </div>
      </RenderIfTrue>
      <RenderIfFalse isFalse={isError}>
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 pt-4 pb-7">
          <TitleSection>{title}</TitleSection>
          <Dropdown
            dataDropdown={dataDropdownAnime}
            onClick={dropdownHandler}
          />
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
        <RenderIfFalse isFalse={isError && isLoading}>
          <RenderIfFalse isFalse={isLoading}>
            <div className="md:hidden container my-6 flex justify-center items-center">
              <div>
                <p className="text-lg md:text-xl text-center">
                  Page {paginate.current_page} of {paginate.last_visible_page}
                </p>
              </div>
            </div>
            <div className="container flex gap-6 justify-center my-6">
              <Button
                width="w-full md:w-1/4"
                bgcolor="bg-pink-700"
                onClick={previousPageHandler}
              >
                &laquo; Prev
              </Button>
              <div className="hidden md:flex items-center justify-center">
                <p className="text-lg md:text-xl text-center">
                  Page {paginate.current_page} of {paginate.last_visible_page}
                </p>
              </div>
              <RenderIfTrue isTrue={paginate.has_next_page}>
                <Button
                  width="w-full md:w-1/4"
                  bgcolor="bg-pink-700"
                  onClick={nextPageHandler}
                >
                  Next &raquo;
                </Button>
              </RenderIfTrue>
            </div>
          </RenderIfFalse>
        </RenderIfFalse>
      </RenderIfFalse>
    </section>
  );
};

export default AnimePagination;
