import { useEffect, useState } from "react";
import {
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../components";
import JIKAN_API from "../../config/Jikan";
import action from "../../action";

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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {jikanManga ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
                {jikanManga.map(({ mal_id, images, title, score }) => (
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
                ))}
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

export default Manga;
