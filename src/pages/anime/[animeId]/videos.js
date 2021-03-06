import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { AlertWarning, Loading, TitleSection } from "../../../components";
import routesAnime from "../../../helper/_routesAnime";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { For, RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getAnimeVideos } = action;

const Videos = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const [videos, setVideos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getVideos = await getAnimeVideos(id);
    if (getVideos !== undefined) {
      setVideos(getVideos);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData(animeId);
  }, [animeId]);

  return (
    <LayoutDetailPage routes={routesAnime(animeId)}>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container text-white mt-8 mb-7">
          <TitleSection>Videos</TitleSection>
        </div>
        <RenderIfTrue isTrue={videos?.promo?.length > 0}>
          <div className="container text-white mt-8 mb-6 xl:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <For
                each={videos?.promo}
                render={(data, index) => (
                  <iframe
                    key={index}
                    src={data?.trailer?.embed_url}
                    width="100%"
                    className="selection:bg-violet-500 aspect-video"
                  ></iframe>
                )}
              />
            </div>
          </div>
        </RenderIfTrue>
        <RenderIfFalse isFalse={videos?.promo?.length > 0}>
          <AlertWarning message="Tidak ada video untuk anime ini." />
        </RenderIfFalse>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Videos;
