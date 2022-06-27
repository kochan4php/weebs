import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { ErrorMessage, Loading, TitleSection } from "../../../components";
import routesAnime from "../../../helper/_routesAnime";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { RenderIfTrue, RenderIfFalse, For } from "../../../utils";

const { getAnimeVideos } = action;

const Videos = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const [videos, setVideos] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (id) => {
    const getVideos = await getAnimeVideos(id);
    if (getVideos) setVideos(getVideos);
    else setIsError(true);
    setIsLoading(false);
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
        <div className="container text-white mt-8 mb-6 xl:px-0">
          <RenderIfTrue isTrue={isError}>
            <ErrorMessage message="Kebanyakan Request di API nya" />
          </RenderIfTrue>
          <RenderIfFalse isFalse={isError}>
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
          </RenderIfFalse>
        </div>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Videos;