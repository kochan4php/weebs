import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { Loading, MainCard, TitleSection } from "../../../components";
import routesManga from "../../../helper/_routesManga";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { For, RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getMangaRecommendations } = action;

const MangaRecommendations = () => {
  const router = useRouter();
  const { mangaId } = router.query;

  const [mangaRecommendations, setMangaRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getDataRecommendations = await getMangaRecommendations(id);
    if (getDataRecommendations !== undefined) {
      setMangaRecommendations(getDataRecommendations);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData(mangaId);
  }, [mangaId]);

  return (
    <LayoutDetailPage routes={routesManga(mangaId)}>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container text-white mt-8 mb-7">
          <TitleSection>Recommendations</TitleSection>
        </div>
        <div className="container text-white mb-6 px-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
            <For
              each={mangaRecommendations}
              render={({ entry }) => (
                <MainCard
                  path={`/manga/${entry?.mal_id}/details`}
                  id={entry?.mal_id}
                  image={
                    entry?.images?.webp?.large_image_url ||
                    entry?.images?.webp?.image_url
                  }
                  key={entry?.mal_id}
                  title={entry?.title}
                  py="py-5"
                  px="px-0.5"
                  fontsize="text-base"
                />
              )}
            />
          </div>
        </div>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default MangaRecommendations;
