import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import action from "../../../action";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import routesManga from "../../../helper/_routesManga";
import {
  Loading,
  ErrorMessage,
  TitleSection,
  ParallaxCardImage,
} from "../../../components";

const { getPhotoManga } = action;

const Pictures = () => {
  const router = useRouter();
  const { mangaId } = router.query;

  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (id) => {
    const getPictures = await getPhotoManga(id);
    if (getPictures) setPictures(getPictures);
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
          <div className="container text-white mt-8">
            <TitleSection>Pictures</TitleSection>
          </div>
          <div className="container text-white mt-8 mb-6 xl:px-0">
            {isError ? (
              <ErrorMessage message="Kebanyakan Request di API nya" />
            ) : (
              <>
                {pictures ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                    {pictures?.map((data, index) => (
                      <ParallaxCardImage
                        image={data?.webp?.large_image_url}
                        alt={`gambar ${index + 1}`}
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <ErrorMessage />
                )}
              </>
            )}
          </div>
        </>
      )}
    </LayoutDetailPage>
  );
};

export default Pictures;
