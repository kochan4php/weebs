import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import {
  AlertWarning,
  Loading,
  MainCard,
  TitleSection,
} from "../../../components";
import routesAnime from "../../../helper/_routesAnime";
import LayoutDetailPage from "../../../layout/layoutDetailPage";
import { For, RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getAnimeCharacters } = action;

const Characters = () => {
  const router = useRouter();
  const { animeId } = router.query;

  const [dataCharacters, setDataCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (id) => {
    const getDataCharacter = await getAnimeCharacters(id);
    if (getDataCharacter !== undefined) {
      setDataCharacters(getDataCharacter);
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
          <TitleSection>Characters</TitleSection>
        </div>
        <RenderIfTrue isTrue={dataCharacters?.length > 0}>
          <div className="container text-white mb-6 px-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
              <For
                each={dataCharacters}
                render={({ character }) => {
                  const name = character?.name.split(", ").join(" ");

                  return (
                    <MainCard
                      path={`/characters/details/${character?.mal_id}`}
                      id={character?.mal_id}
                      image={character?.images?.webp?.image_url}
                      key={character?.mal_id}
                      title={name}
                      py="py-5"
                      px="px-0.5"
                      centerText
                      fontsize="text-base md:text-lg"
                    />
                  );
                }}
              />
            </div>
          </div>
        </RenderIfTrue>
        <RenderIfFalse isFalse={dataCharacters?.length > 0}>
          <AlertWarning message="Tidak ada character pada anime ini." />
        </RenderIfFalse>
      </RenderIfFalse>
    </LayoutDetailPage>
  );
};

export default Characters;
