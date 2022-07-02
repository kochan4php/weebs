import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { Loading, ParallaxImage, Synopsis, Text } from "../../../components";
import routesAnime from "../../../helper/_routesAnime";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { For, RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getDetailAnime } = action;

const DetailAnime = () => {
  const router = useRouter();
  const { animeId } = router.query;
  const routes = routesAnime(animeId);

  const [detailData, setDetailData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getDetailData = await getDetailAnime(id);
    if (getDetailData !== undefined) {
      setDetailData(getDetailData);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData(animeId);
  }, [animeId]);

  return (
    <LayoutDetailPage routes={routes}>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <RenderIfTrue isTrue={detailData?.trailer?.embed_url}>
          <div className="container p-0">
            <iframe
              src={detailData?.trailer?.embed_url}
              width="100%"
              className="aspect-[18/10] md:aspect-[18/8] selection:bg-violet-500"
            ></iframe>
          </div>
        </RenderIfTrue>
        <div className="container my-10 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex justify-center items-center selection:bg-pink-500">
              <ParallaxImage
                image={detailData?.images?.webp?.large_image_url}
                alt={detailData?.title}
              />
            </div>
            <div className="flex flex-col justify-start md:col-start-2 md:col-end-4 p-4 md:py-0">
              <RenderIfTrue isTrue={detailData?.score}>
                <span className="gap-3 mt-3 md:mt-0 md:mb-4 text-2xl md:text-xl lg:text-2xl flex items-center selection:bg-emerald-500 selection:text-emerald-900">
                  <span className="text-3xl text-yellow-500">⭐</span>{" "}
                  <span>{detailData?.score}</span>
                </span>
              </RenderIfTrue>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold my-6 md:my-0 md:mb-5 selection:bg-violet-500 selection:text-violet-900">
                {detailData?.title}
              </h1>
              <div className="text-lg selection:bg-pink-500 selection:text-pink-900">
                <RenderIfTrue isTrue={detailData?.aired?.string}>
                  <Text category="Release">{detailData?.aired?.string}</Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.rank}>
                  <Text category="Rank">{detailData?.rank}</Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.genres}>
                  <Text category="Genre">
                    <For
                      each={detailData?.genres}
                      render={(genre, index) => (
                        <span key={index}>{genre.name}, </span>
                      )}
                    />
                  </Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.type}>
                  <Text category="Type">{detailData?.type}</Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.duration}>
                  <Text category="Duration">{detailData?.duration}</Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.studios}>
                  <Text category="Studio">
                    {detailData?.studios?.map((studio) => studio.name)}
                  </Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.status}>
                  <Text category="Status"> {detailData?.status}</Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.rating}>
                  <Text category="Rating"> {detailData?.rating}</Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.year}>
                  <Text category="Year"> {detailData?.year}</Text>
                </RenderIfTrue>
                <RenderIfTrue isTrue={detailData?.season}>
                  <Text category="Season"> {detailData?.season}</Text>
                </RenderIfTrue>
              </div>
            </div>
          </div>
          <RenderIfTrue isTrue={detailData?.synopsis}>
            <Synopsis>{detailData?.synopsis}</Synopsis>
          </RenderIfTrue>
        </div>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default DetailAnime;
