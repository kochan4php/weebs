import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import {
  ErrorMessage,
  Loading,
  ParallaxImage,
  Synopsis,
  Text,
} from "../../../components";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import routesManga from "../../../helper/_routesManga";

const { getDetailManga } = action;

const DetailAnime = () => {
  const router = useRouter();
  const { mangaId } = router.query;

  const [detailData, setDetailData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (id) => {
    const getDetailData = await getDetailManga(id);
    console.log(getDetailData);
    if (getDetailData) setDetailData(getDetailData);
    else setIsError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    getData(mangaId);
  }, [mangaId]);

  return (
    <LayoutDetailPage routes={routesManga(mangaId)}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-10 p-4">
            {isError ? (
              <ErrorMessage message="Kebanyakan Request di API nya" />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="flex justify-center items-center selection:bg-pink-500">
                    <ParallaxImage
                      image={detailData?.images?.webp?.large_image_url}
                      alt={detailData?.title}
                    />
                  </div>
                  <div className="flex flex-col justify-start md:col-start-2 md:col-end-4 p-4 md:py-0">
                    {detailData?.score && (
                      <span className="gap-3 mt-3 md:mt-0 md:mb-4 text-2xl md:text-xl lg:text-2xl flex items-center selection:bg-emerald-500 selection:text-emerald-900">
                        <span className="text-3xl text-yellow-500">⭐</span>{" "}
                        <span>{detailData?.score}</span>
                      </span>
                    )}
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold my-6 md:my-0 md:mb-5 selection:bg-violet-500 selection:text-violet-900">
                      {detailData?.title}
                    </h1>
                    <div className="text-lg selection:bg-pink-500 selection:text-pink-900">
                      <Text category="Japanese">
                        {detailData?.title_japanese}
                      </Text>
                      <Text category="Published">
                        {detailData?.published?.string}
                      </Text>
                      <Text category="Rank">{detailData?.rank}</Text>
                      <Text category="Genre">
                        {detailData?.genres?.map((genre, index) => (
                          <span key={index}>{genre.name}, </span>
                        ))}
                      </Text>
                      <Text category="Type">{detailData?.type}</Text>
                      <Text category="Favorites">{detailData?.favorites}</Text>
                      <Text category="Status"> {detailData?.status}</Text>
                      {detailData?.chapters && (
                        <Text category="Chapter"> {detailData?.chapters}</Text>
                      )}
                      {detailData?.volumes && (
                        <Text category="Volumes"> {detailData?.volumes}</Text>
                      )}
                    </div>
                  </div>
                </div>

                <Synopsis>
                  {detailData?.synopsis ? detailData?.synopsis : "No synopsis."}
                </Synopsis>
              </>
            )}
          </div>
        </>
      )}
    </LayoutDetailPage>
  );
};

export default DetailAnime;
