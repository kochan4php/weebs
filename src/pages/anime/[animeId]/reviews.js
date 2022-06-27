import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { ErrorMessage, Loading, TitleSection } from "../../../components";
import routesAnime from "../../../helper/_routesAnime";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { RenderIfTrue, RenderIfFalse, For } from "../../../utils";

const { getAnimeReviews } = action;

const Reviews = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (id) => {
    const getReviews = await getAnimeReviews(id);
    if (getReviews) setReviews(getReviews);
    else setIsError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    getData(animeId);
    console.log(reviews);
  }, [animeId]);

  return (
    <LayoutDetailPage routes={routesAnime(animeId)}>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container text-white mt-8 mb-7">
          <TitleSection>Reviews</TitleSection>
        </div>
        <div className="container text-white mt-8 mb-6">
          <RenderIfTrue isTrue={isError}>
            <ErrorMessage message="Kebanyakan request di API nya" />
          </RenderIfTrue>
          <RenderIfFalse isFalse={isError}>
            <h1>Berhasil Bang Hehehe</h1>
          </RenderIfFalse>
        </div>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Reviews;
