import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import action from "../../../action";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import routesAnime from "../../../helper/_routesAnime";
import {
  Loading,
  ErrorMessage,
  TitleSection,
  ParallaxCardImage,
} from "../../../components";
import { RenderIfTrue, RenderIfFalse, For } from "../../../utils";

const { getPhotoAnime } = action;

const Pictures = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getPictures = await getPhotoAnime(id);
    setPictures(getPictures);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
          <TitleSection>Pictures</TitleSection>
        </div>
        <div className="container text-white mt-8 mb-6 xl:px-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            <For
              each={pictures}
              render={(data, index) => (
                <ParallaxCardImage
                  image={data?.webp?.large_image_url}
                  alt={`gambar ${index + 1}`}
                  key={index}
                />
              )}
            />
          </div>
        </div>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Pictures;
