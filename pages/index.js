import { Card } from "../components";
import JIKAN_URL from "../config/Jikan";

const Home = ({ data }) => {
  const getAnimeNow = data.data;
  console.log(getAnimeNow);

  return (
    <section className="min-h-screen min-w-full bg-slate-800 py-10">
      <div className="container min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {getAnimeNow.map((data, index) => (
            <Card
              path={`/anime/${data?.mal_id}`}
              key={data.mal_id}
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
                  <span className="text-yellow-600">{data.score && "⭐"}</span>
                </span>
              </div>
              <a className="text-slate-50 px-4 py-6 group-hover:text-fuchsia-400 tracking-wide transition-colors duration-300 selection:bg-teal-500 selection:text-teal-800 block">
                {data?.title}
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
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
