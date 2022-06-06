import { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardImage,
  CardMobile,
  Loading,
  TitleSection,
} from "../../components";
import JIKAN_API from "../../config/Jikan";

const Anime = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [anime, setAnime] = useState([]);
  const [path, setPath] = useState("upcoming");
  const [title, setTitle] = useState("Top Upcoming Anime");

  useEffect(() => {
    const getAnime = async (type) => {
      const request = await fetch(`${JIKAN_API}/seasons/${path}`);
      const response = await request.json();
      setAnime(response.data);
      setIsLoading(false);
    };

    getAnime(path);
  }, [path]);

  const handleClick = (e) => setPath(e.target.value);

  return (
    <section className="min-h-screen bg-slate-800 pt-5 pb-10 text-white">
      <div className="container mb-8">
        <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between">
          <div className="w-1/2 md:w-1/3">
            <form>
              <div className="relative w-full">
                <select
                  className="block appearance-none w-full bg-slate-900 border border-slate-800 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-slate-700 focus:border-slate-700"
                  onChange={handleClick}
                >
                  <option value="now">Now Airing</option>
                  <option value="upcoming">Upcoming</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
          <div>
            <TitleSection className="my-4">{title}</TitleSection>
          </div>
        </div>
      </div>
      <div className="container px-0 md:px-4 min-h-screen">
        {!isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-6">
            {anime.map((data) => (
              <Fragment key={data?.mal_id}>
                <CardMobile
                  bgimage={data?.images?.webp?.large_image_url}
                  path={"/"}
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
                    path={`/anime/${data?.mal_id}`}
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
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default Anime;
