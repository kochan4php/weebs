import { useRouter } from "next/router";
import { Button, ErrorMessage, MainCard, TitleSection } from "../components";
import JIKAN_URL from "../config/Jikan";
import { For, RenderIfFalse, RenderIfTrue } from "../utils";

export const getServerSideProps = async () => {
  const request = await fetch(`${JIKAN_URL}/seasons/now?limit=20`);
  const response = await request.json();

  return {
    props: {
      data: response,
    },
  };
};

const Home = ({ data }) => {
  const getAnimeNow = data.data;
  const router = useRouter();

  return (
    <>
      <section
        className="bg-slate-800 min-w-full bg-cover bg-center bg-no-repeat object-cover"
        style={{
          backgroundImage: `url(${getAnimeNow[0]?.trailer?.images?.maximum_image_url})`,
        }}
      >
        <section className="min-h-[40vh] sm:min-h-[50vh] md:min-h-[40vh] lg:min-h-[70vh] xl:min-h-[80vh] 2xl:min-h-[75vh] bg-slate-800 bg-opacity-40 backdrop-blur-lg backdrop-brightness-90 flex items-center justify-start px-2 md:px-6 pb-6">
          <div className="container max-w-full lg:max-w-3xl">
            <div className="my-6">
              <h1 className="text-slate-50 text-2xl md:text-4xl font-semibold mb-4 selection:bg-red-700 selection:text-red-200">
                {getAnimeNow[0]?.title}
              </h1>
            </div>
            <div className="my-6">
              <p className="text-lg md:text-2xl text-slate-200 font-medium truncate selection:bg-teal-400 selection:text-teal-900">
                {getAnimeNow[0]?.synopsis}
              </p>
            </div>
            <div className="my-6">
              <Button
                onClick={() =>
                  router.push(`/anime/${getAnimeNow[0]?.mal_id}/details`)
                }
                width="w-full"
              >
                Detail
              </Button>
            </div>
          </div>
        </section>
      </section>
      <section className="min-h-screen min-w-full bg-slate-800 py-10">
        <div className="mb-7 container">
          <TitleSection>Airing Now</TitleSection>
        </div>
        <div className="container px-0 md:px-4 min-h-screen">
          <RenderIfTrue isTrue={getAnimeNow.length > 0}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
              <For
                each={getAnimeNow}
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
          <RenderIfFalse isFalse={getAnimeNow.length > 0}>
            <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
          </RenderIfFalse>
        </div>
      </section>
    </>
  );
};

export default Home;
