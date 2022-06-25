import { ErrorMessage, Hero, MainCard } from "../components";
import JIKAN_URL from "../config/Jikan";

export const getServerSideProps = async () => {
  const request = await fetch(`${JIKAN_URL}/seasons/now`);
  const response = await request;
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};

const Home = ({ data }) => {
  const getAnimeNow = data.data;

  return (
    <>
      <section className="bg-slate-800 bg-[url('/img/spy-mobile.webp')] md:bg-[url('/img/spy.jpg')] min-w-full bg-cover bg-top bg-no-repeat">
        <Hero />
      </section>
      <section className="min-h-screen min-w-full bg-slate-800 py-10">
        <div className="container px-0 md:px-4 min-h-screen">
          <div className="mb-7 mx-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-sky-400 font-semibold">
              Airing Now
            </h1>
          </div>
          {getAnimeNow ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
              {getAnimeNow.map(({ mal_id, images, title, score }) => {
                return (
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
                );
              })}
            </div>
          ) : (
            <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
