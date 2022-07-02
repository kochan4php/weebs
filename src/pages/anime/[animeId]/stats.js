import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { ErrorMessage, Loading, Text, TitleSection } from "../../../components";
import routesAnime from "../../../helper/_routesAnime";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { RenderIfTrue, RenderIfFalse, For } from "../../../utils";

const { getAnimeStats } = action;

const Stats = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const [statistics, setStatistics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getStatistics = await getAnimeStats(id);
    if (getStatistics !== undefined) {
      setStatistics(getStatistics);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (getData(animeId)) setIsLoading(false);
  }, [animeId]);

  return (
    <LayoutDetailPage routes={routesAnime(animeId)}>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container text-white mt-8 mb-7">
          <TitleSection>Statistics</TitleSection>
        </div>
        <div className="container text-white md:mt-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="text-lg selection:bg-pink-500 selection:text-pink-900 w-full md:w-1/2">
              <h3 className="text-2xl mb-4 md:mb-3 selection:bg-violet-500 selection:text-violet-900 pb-3 border-b border-slate-500">
                Summary Stats
              </h3>
              <RenderIfTrue isTrue={statistics?.watching}>
                <Text category="Watching">{statistics?.watching}</Text>
              </RenderIfTrue>
              <RenderIfTrue isTrue={statistics?.completed}>
                <Text category="Completed">{statistics?.completed}</Text>
              </RenderIfTrue>
              <RenderIfTrue isTrue={statistics?.on_hold}>
                <Text category="On-Hold">{statistics?.on_hold}</Text>
              </RenderIfTrue>
              <RenderIfTrue isTrue={statistics?.dropped}>
                <Text category="Dropped">{statistics?.dropped}</Text>
              </RenderIfTrue>
              <RenderIfTrue isTrue={statistics?.plan_to_watch}>
                <Text category="Plan to Watch">
                  {statistics?.plan_to_watch}
                </Text>
              </RenderIfTrue>
              <RenderIfTrue isTrue={statistics?.total}>
                <Text category="Total">{statistics?.total}</Text>
              </RenderIfTrue>
            </div>
            <div className="text-lg text-left selection:bg-pink-500 selection:text-pink-900 w-full md:w-1/2">
              <h3 className="text-2xl mb-4 md:mb-3 selection:bg-violet-500 selection:text-violet-900 pb-3 border-b border-slate-500">
                Score Stats
              </h3>
              <For
                each={statistics?.scores?.reverse()}
                render={(data, index) => (
                  <div
                    className="mb-3 flex gap-5 justify-evenly items-center"
                    key={index}
                  >
                    <span>{data?.score}. </span>
                    <progress
                      value={data?.percentage}
                      max="100"
                      className="w-1/3 xl:w-2/3 text-teal-500"
                    ></progress>
                    <span className="text-sm">
                      {data?.percentage} % ({data?.votes} votes)
                    </span>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Stats;
