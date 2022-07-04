import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { AlertWarning, Loading, TitleSection } from "../../../components";
import routesAnime from "../../../helper/_routesAnime";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getAnimeReviews } = action;

const Reviews = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getReviews = await getAnimeReviews(id);
    if (getReviews !== undefined) {
      setReviews(getReviews);
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
          <TitleSection>Reviews</TitleSection>
        </div>
        <RenderIfTrue isTrue={reviews?.length > 0}>
          <div className="container text-white mt-8 mb-6">
            <h1>Berhasil Bang Hehehe</h1>
          </div>
        </RenderIfTrue>
        <RenderIfFalse isFalse={reviews?.length > 0}>
          <AlertWarning message="Belum ada review untuk anime ini." />
        </RenderIfFalse>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Reviews;
