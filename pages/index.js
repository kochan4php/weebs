import { Fragment } from "react";
import Link from "next/link";
import { Card, Hero, ImageComponent } from "../components";
import JIKAN_URL from "../config/Jikan";

const Home = ({ data }) => {
  const getAnimeNow = data.data;

  return (
    <>
      <section className="bg-slate-800 bg-[url('/img/spy.jpg')] min-h-[65vh] md:min-h-[40vh] min-w-full bg-cover bg-top bg-no-repeat">
        <Hero />
      </section>
      <section className="min-h-screen min-w-full bg-slate-800 py-10">
        <div className="container px-0 md:px-4 min-h-screen">
          <div className="mb-7 mx-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-sky-400 font-semibold">
              Airing Now
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-6">
            {getAnimeNow.map((data) => {
              return (
                <Fragment key={data?.mal_id}>
                  <div
                    className="md:hidden bg-cover bg-center h-full"
                    style={{
                      backgroundImage: `url('${data?.images?.webp?.large_image_url}')`,
                    }}
                  >
                    <div className="backdrop-blur bg-slate-900 bg-opacity-30 min-h-full">
                      <Link href="/">
                        <div className="cursor-pointer group px-3 sm:px-5 sm:pt-8 pt-6 pb-3 relative">
                          <ImageComponent
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
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <Card
                      path={`/anime/${data?.mal_id}`}
                      bgcolor="bg-slate-700"
                      shadowSize="shadow-lg"
                      shadow="shadow-slate-800"
                    >
                      <ImageComponent
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const request = await fetch(`${JIKAN_URL}/seasons/now`);
  const response = await request;
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
