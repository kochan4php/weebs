import { Card } from "../components";
import JIKAN_URL from "../config/Jikan";

const Home = ({ data }) => {
  const getAnimeNow = data.data;
  console.log(getAnimeNow);

  return (
    <>
      <section className="bg-slate-800 min-h-[65vh] md:min-h-[80vh] min-w-full bg-[url('/img/spy.jpg')] bg-cover bg-top bg-no-repeat">
        <section className="min-h-[65vh] md:min-h-[80vh] bg-slate-800 bg-opacity-25 flex flex-col justify-evenly md:justify-center px-2 md:px-6 pb-6">
          <div className="max-w-full lg:max-w-4xl">
            <h1 className="text-slate-50 text-3xl md:text-4xl font-bold mb-4">
              Lorem ipsum dolor sit amet
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 font-semibold">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam
              natus quod consectetur inventore? Sit reiciendis in facere ad
              inventore ullam. natus quod consectetur
            </p>
          </div>
        </section>
      </section>
      <section className="min-h-screen min-w-full bg-slate-800 py-10">
        <div className="container min-h-screen">
          <div className="mb-7 mx-1">
            <h1 className="text-3xl text-sky-400 font-semibold">Airing Now</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {getAnimeNow.map((data) => (
              <>
                <div className="hidden sm:block" key={data.mal_id}>
                  <Card
                    path={`/anime/${data?.mal_id}`}
                    bgcolor="bg-slate-700"
                    shadowSize="shadow-lg"
                    shadow="shadow-slate-800"
                  >
                    <img
                      src={data?.images?.webp?.large_image_url}
                      alt={data?.title}
                      width="100%"
                      heigth="100%"
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
              </>
            ))}
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
