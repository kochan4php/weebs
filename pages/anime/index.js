import { Fragment, useEffect, useState, useCallback } from "react";
import {
  Card,
  CardImage,
  CardMobile,
  Loading,
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-6">
                {anime.map((data) => (
                  <Fragment key={data?.mal_id}>
                    <CardMobile
                      bgimage={data?.images?.webp?.large_image_url}
                      path={`/anime/detail/${data?.mal_id}`}
                    >
                      <CardImage
                        src={data?.images?.webp?.large_image_url}
                        alt={data?.title}
                      />
                      <div className="absolute -top-0 -left-0 bg-slate-100 text-slate-800 px-2 py-1 border bg-opacity-75 border-sky-500 z-50 rounded-br text-sm">
                        <span>
                          {data.score ? data?.score : "Unknown"}&nbsp;
                          <span className="text-yellow-600">
                            {data.score && "⭐"}
                          </span>
                        </span>
                      </div>
                      <a className="text-white group-hover:text-fuchsia-400 tracking-wide transition-colors duration-300 selection:bg-teal-500 selection:text-teal-800 block py-3 px-1 truncate font-medium">
                        {data?.title}
                      </a>
                    </CardMobile>

                    <div className="hidden md:block">
                      <Card
                        path={`/anime/detail/${data?.mal_id}`}
                        bgcolor="bg-slate-700"
                        shadowSize="shadow-lg"
                        shadow="shadow-slate-800"
                      >
                        <CardImage
                          src={data?.images?.webp?.large_image_url}
                          alt={data?.title}
                        />
                        <div className="absolute -top-0 -left-0 bg-slate-100 text-slate-800 px-2 py-1 rounded-tl-md border bg-opacity-75 border-sky-500 z-50">
                          <span>
                            {data.score ? data?.score : "Unknown"}&nbsp;
                            <span className="text-yellow-600">
                              {data.score && "⭐"}
                            </span>
                          </span>
                        </div>
                        <a className="text-slate-50 px-4 py-6 group-hover:text-fuchsia-400 tracking-wide transition-colors duration-300 selection:bg-teal-500 selection:text-teal-800 block">
                          {data?.title}
                        </a>
                      </Card>
                    </div>
                  </Fragment>
                ))}
              </div>
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
