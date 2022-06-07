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
    const getAnime = async (path) => {
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
