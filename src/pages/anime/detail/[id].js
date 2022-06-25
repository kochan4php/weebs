import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Loading, Text, Synopsis, Button } from "../../../components";
import JIKAN_API from "../../../config/Jikan";

const DetailAnime = () => {
  const router = useRouter();
  const { id } = router.query;
  const [detailAnime, setDetailAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => router.back();

  useEffect(() => {
    const getDetailAnime = async () => {
      const response = await fetch(`${JIKAN_API}/anime/${id}/full`);
      const detailDataAnime = await response.json();
      const finalData = await detailDataAnime.data;
      setDetailAnime(finalData);
      setIsLoading(false);
    };

    getDetailAnime();
  }, [id]);

  return (
    <section className="min-w-full bg-slate-800 text-white py-4 min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {detailAnime?.trailer?.embed_url && (
            <div className="container p-0">
              <iframe
                src={detailAnime?.trailer?.embed_url}
                width="100%"
                className="aspect-[18/10] md:aspect-[18/9]"
              ></iframe>
            </div>
          )}
          <div className="container my-10 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex justify-center min-h-full w-full">
                <Tilt perspective={700}>
                  <img
                    src={detailAnime?.images?.webp?.image_url}
                    alt={detailAnime?.title}
                    className="rounded shadow shadow-slate-800"
                    height="100%"
                    width="100%"
                  />
                </Tilt>
              </div>
              <div className="flex flex-col justify-start md:col-start-2 md:col-end-4 p-4 md:py-0">
                {detailAnime?.score && (
                  <span className="gap-3 mt-2 md:mt-0 md:mb-4 text-2xl md:text-xl lg:text-2xl flex items-center">
                    <span className="text-3xl text-yellow-500">⭐</span>{" "}
                    <span>{detailAnime?.score}</span>
                  </span>
                )}
                <h1 className="text-3xl lg:text-4xl font-semibold my-8 md:my-0 md:mb-5">
                  {detailAnime?.title}
                </h1>
                <div className="text-lg">
                  <Text category="Release">{detailAnime?.aired?.string}</Text>
                  <Text category="Genre">
                    {detailAnime?.themes.map((genre, index) => {
                      const coma =
                        detailAnime?.themes.length - 1 === index
                          ? (coma = "")
                          : (coma = ", ");

                      return (
                        <span key={index}>
                          {genre.name}
                          {coma}
                        </span>
                      );
                    })}
                  </Text>
                  <Text category="Duration">{detailAnime?.duration}</Text>
                  <Text category="Studio">
                    {detailAnime?.studios.map((studio) => studio.name)}
                  </Text>
                  <Text category="Status"> {detailAnime?.status}</Text>
                </div>
              </div>
            </div>

            <Synopsis>
              {detailAnime?.synopsis ? detailAnime?.synopsis : "No Synopsis"}
            </Synopsis>
          </div>
        </>
      )}
    </section>
  );
};

export default DetailAnime;
