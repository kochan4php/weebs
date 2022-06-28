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

const { getTopManga } = action;

const Manga = () => {
  const [jikanManga, setJikanManga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    const response = await getTopManga();
    if (response) setJikanManga(response);
    else setIsError(true);
    setIsLoading(false);
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
          </RenderIfTrue>
          <RenderIfFalse isFalse={jikanManga.length > 0}>
            <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
          </RenderIfFalse>
        </RenderIfFalse>
      </div>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container flex gap-6 justify-center my-6">
          <Button fullWidth bgcolor="bg-pink-700">
            &laquo; Previous Manga
          </Button>
          <Button fullWidth bgcolor="bg-pink-700">
            Next Manga &raquo;
          </Button>
        </div>
      </RenderIfFalse>
    </section>
  );
};

export default Manga;
