import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import { ErrorMessage, Loading, TitleSection } from "../../../components";
import routesManga from "../../../helper/_routesManga";
import LayoutDetailPage from "../../../layout/layoutDetailPage";

const { getMangaReviews } = action;

const Reviews = () => {
  const router = useRouter();
  const { mangaId } = router.query;

  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (id) => {
    const getReviews = await getMangaReviews(id);
    if (getReviews) setReviews(getReviews);
    else setIsError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    getData(mangaId);
    console.log(reviews);
  }, [mangaId]);

  return (
    <LayoutDetailPage routes={routesManga(mangaId)}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container text-white mt-8">
            <TitleSection>Reviews</TitleSection>
          </div>
          <div className="container text-white mt-8 mb-6">
            {isError ? (
              <ErrorMessage message="Kebanyakan request di API nya" />
            ) : (
              <h1>Berhasil Bang Hehehe</h1>
            )}
          </div>
        </>
      )}
    </LayoutDetailPage>
  );
};

export default Reviews;
