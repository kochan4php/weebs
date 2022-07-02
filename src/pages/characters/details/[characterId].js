import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import {
  ErrorMessage,
  Loading,
  MainCard,
  ParallaxCardImage,
  ParallaxImage,
  Synopsis,
  Text,
  TitleSection,
} from "../../../components";
import { RenderIfTrue, RenderIfFalse, For } from "../../../utils";

const { getDetailCharacter, getPhotoCharacter } = action;

const DetailCharacter = () => {
  const router = useRouter();
  const { characterId } = router.query;

  const [detailCharacter, setDetailCharacter] = useState([]);
  const [photosCharacter, setPhotosCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (id) => {
    const getDataCharacter = await getDetailCharacter(id);
    const getPhotosCharacter = await getPhotoCharacter(id);
    if (getDataCharacter !== undefined && getPhotosCharacter !== undefined) {
      setDetailCharacter(getDataCharacter);
      setPhotosCharacter(getPhotosCharacter);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData(characterId);
  }, [characterId]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 text-white pt-10 pb-6 min-h-screen">
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container text-white mb-7">
          <TitleSection>Detail Character</TitleSection>
        </div>
        <div className="container my-10 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex justify-center items-center selection:bg-pink-500">
              <ParallaxImage
                image={detailCharacter?.images?.webp?.image_url}
                alt={detailCharacter?.name}
              />
            </div>
            <div className="flex items-center justify-start md:col-start-2 md:col-end-4 p-4 md:py-0">
              <div className="flex flex-col">
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold my-6 md:my-0 md:mb-5 selection:bg-violet-500 selection:text-violet-900">
                  {detailCharacter?.name}
                </h1>
                <div className="text-lg selection:bg-pink-500 selection:text-pink-900">
                  <Text category="Kanji">{detailCharacter?.name_kanji}</Text>
                  <Text category="Favorite">{detailCharacter?.favorites}</Text>
                </div>
              </div>
            </div>
          </div>
          <RenderIfTrue isTrue={detailCharacter?.about}>
            <div className="mt-10 lg:mt-0 md:pt-10 lg:pt-16">
              <h1 className="text-3xl md:text-4xl mb-7 selection:bg-emerald-500 selection:text-emerald-900">
                About
              </h1>
              <div className="text-md md:text-lg text-justify md:text-left selection:bg-green-500 selection:text-green-900">
                <p
                  className="leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: detailCharacter?.about?.replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br />"
                    ),
                  }}
                />
              </div>
            </div>
          </RenderIfTrue>
          <RenderIfTrue isTrue={detailCharacter?.anime?.length > 0}>
            <div className="mt-10 lg:mt-0 md:pt-10 lg:pt-16">
              <h1 className="text-3xl md:text-4xl mb-7 selection:bg-emerald-500 selection:text-emerald-900">
                Anime
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5 -mx-4 md:mx-0">
                <For
                  each={detailCharacter?.anime}
                  render={(data) => (
                    <MainCard
                      key={data?.anime?.mal_id}
                      path={`/anime/${data?.anime?.mal_id}/details`}
                      id={data?.anime?.mal_id}
                      image={data?.anime?.images?.webp?.large_image_url}
                      title={data?.anime?.title}
                      py="py-5"
                      fontsize="text-base"
                    />
                  )}
                />
              </div>
            </div>
          </RenderIfTrue>
          <RenderIfTrue isTrue={detailCharacter?.manga?.length > 0}>
            <div className="mt-10 lg:mt-0 md:pt-10 lg:pt-16">
              <h1 className="text-3xl md:text-4xl mb-7 selection:bg-emerald-500 selection:text-emerald-900">
                Manga
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5 -mx-4 md:mx-0">
                <For
                  each={detailCharacter?.manga}
                  render={(data) => (
                    <MainCard
                      key={data?.manga?.mal_id}
                      path={`/manga/${data?.manga?.mal_id}/details`}
                      id={data?.manga?.mal_id}
                      image={data?.manga?.images?.webp?.large_image_url}
                      title={data?.manga?.title}
                      py="py-5"
                      fontsize="text-base"
                    />
                  )}
                />
              </div>
            </div>
          </RenderIfTrue>
          <RenderIfTrue isTrue={photosCharacter !== []}>
            <div className="mt-10 lg:mt-0 md:pt-10 lg:pt-16">
              <h1 className="text-3xl md:text-4xl mb-7 selection:bg-emerald-500 selection:text-emerald-900">
                Photos
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                <For
                  each={photosCharacter}
                  render={(data, index) => (
                    <ParallaxCardImage
                      image={data?.jpg?.image_url}
                      alt={`gambar ${index + 1}`}
                      key={index}
                    />
                  )}
                />
              </div>
            </div>
          </RenderIfTrue>
        </div>
      </RenderIfFalse>
    </section>
  );
};

export default DetailCharacter;
