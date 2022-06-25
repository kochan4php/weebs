import { useCallback, useEffect, useState } from "react";
import {
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../components";
import JIKAN_API from "../../config/Jikan";

const Anime = () => {
  const [valueInput, setValueInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [anime, setAnime] = useState([]);

  const getAnime = async (query = "") => {
    const request =
      query === ""
        ? await fetch(`${JIKAN_API}/seasons/now`)
        : await fetch(`${JIKAN_API}/anime?q=${query}`);

    if (!request.ok) {
      setIsLoading(false);
      setIsError(true);
    } else {
      const response = await request.json();
      setAnime(response.data);
      setIsLoading(false);
      setIsError(false);
    }
  };

  useEffect(() => {
    getAnime();
  }, [valueInput]);

  const handleChange = (e) => {
    const input = e.target.value;
    setValueInput(input);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      getAnime(valueInput);
    },
    [valueInput]
  );

  return (
    <section className="min-h-screen bg-slate-800 pt-5 pb-10 text-white">
      <div className="container mt-3 mb-10 flex flex-col items-center justify-between md:flex-row">
        <TitleSection
          className="self-center mt-2 mb-4 md:my-0 text-center"
          fontSize="text-2xl md:text-3xl"
        >
          {valueInput === "" ? "Airing Now" : `Results for : ${valueInput}`}
        </TitleSection>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="search"
            onChange={handleChange}
            value={valueInput}
            placeholder="Search anime or manga"
            className="min-h-full border border-sky-500 w-full outline-none lg:w-96 sm:w-80 px-4 py-2 rounded-tl rounded-bl focus:outline-none focus:ring focus:ring-sky-500 bg-slate-900 transition-all duration-300 truncate"
          />
          <button
            type="submit"
            className="bg-sky-500 px-4 rounded-tr rounded-br hover:bg-sky-600 active:ring active:ring-sky-500 focus:ring-sky-500 transition-all duration-300"
          >
            Search
          </button>
        </form>
      </div>
      <div className="container px-0 md:px-4 min-h-screen">
        {!isLoading ? (
          <>
            {isError ? (
              <div className="flex min-h-screen items-center justify-center">
                <p className="text-center font-semibold text-3xl">
                  Hadeh terlalu banyak request bang :(
                </p>
              </div>
            ) : (
              <>
                {anime ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-6">
                    {anime.map(({ mal_id, images, title, score }) => (
                      <MainCard
                        key={mal_id}
                        path={`/anime/detail/${mal_id}/`}
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
          </>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default Anime;
