import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../action";
import {
  Button,
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../components";
import { For, RenderIfFalse, RenderIfTrue } from "../../utils";

const { getMangaWithPagination } = action;

const Manga = () => {
  const router = useRouter();

  const [paginate, setPaginate] = useState({});
  const [jikanManga, setJikanManga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextPageHandler = () => {
    setIsLoading(true);
    router.push(`/manga/page/2`);
  };

  const getData = async (page) => {
    const res = await getMangaWithPagination(page);
    if (res !== undefined) {
      setJikanManga(await res.data);
      setPaginate(await res.pagination);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 pt-4 pb-8 min-h-screen">
      <div className="container flex justify-between items-center pt-4 pb-7">
        <TitleSection>Top Manga</TitleSection>
      </div>
      <div className="container px-0 lg:px-4">
        <RenderIfTrue isTrue={isLoading}>
          <Loading />
        </RenderIfTrue>
        <RenderIfFalse isFalse={isLoading}>
          <RenderIfTrue isTrue={jikanManga.length > 0}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
              <For
                each={jikanManga}
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
            <div className="md:hidden container my-6 flex justify-center items-center">
              <div>
                <p className="text-lg md:text-xl text-center">
                  Page {paginate?.current_page} of {paginate?.last_visible_page}
                </p>
              </div>
            </div>
            <div className="container flex gap-6 justify-center my-6">
              <div className="hidden md:flex items-center justify-center">
                <p className="text-lg md:text-xl text-center">
                  Page {paginate?.current_page} of {paginate?.last_visible_page}
                </p>
              </div>
              <RenderIfTrue isTrue={paginate?.has_next_page}>
                <Button
                  width="w-full md:w-1/4"
                  bgcolor="bg-pink-700"
                  onClick={nextPageHandler}
                >
                  Next &raquo;
                </Button>
              </RenderIfTrue>
            </div>
          </RenderIfTrue>
          <RenderIfFalse isFalse={jikanManga.length > 0}>
            <div className="container">
              <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
            </div>
          </RenderIfFalse>
        </RenderIfFalse>
      </div>
    </section>
  );
};

export default Manga;
