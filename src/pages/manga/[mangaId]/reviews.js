import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { Loading, TitleSection } from "../../../components";
import routesManga from "../../../helper/_routesManga";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getMangaReviews } = action;

const Reviews = () => {
  const router = useRouter();
  const { mangaId } = router.query;

  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getReviews = await getMangaReviews(id);
    if (getReviews !== undefined) {
      setReviews(getReviews);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData(mangaId);
    console.log(reviews);
  }, [mangaId]);

  return (
    <LayoutDetailPage routes={routesManga(mangaId)}>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container text-white mt-8 mb-7">
          <TitleSection>Reviews</TitleSection>
        </div>
        <div className="container text-white mt-8 mb-6">
          <h1>Berhasil Bang Hehehe</h1>
        </div>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Reviews;
