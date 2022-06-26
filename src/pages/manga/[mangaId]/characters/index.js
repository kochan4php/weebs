import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../../action";
import {
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../../../components";
import LayoutDetailPage from "../../../../layout/layoutDetailPage";
import routesManga from "../../../../helper/_routesManga";

const { getMangaCharacters } = action;

const Characters = () => {
  const router = useRouter();
  const { mangaId } = router.query;

  const [dataCharacters, setDataCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (id) => {
    const getDataCharacter = await getMangaCharacters(id);
    if (getDataCharacter) setDataCharacters(getDataCharacter);
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
            <TitleSection>Characters</TitleSection>
          </div>
          <div className="container text-white mb-6 px-0">
            {isError ? (
              <ErrorMessage message="Kebanyakan Request di API nya" />
            ) : (
              <>
                {dataCharacters ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
                    {dataCharacters.map(({ character, role }) => {
                      const name = character?.name
                        .split(", ")
                        .reverse()
                        .join(" ");
                      if (character?.mal_id === 147908) return;

                      return (
                        <MainCard
                          path={`/anime/${mangaId}/characters/${character?.mal_id}`}
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
                    })}
                  </div>
                ) : (
                  <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
                )}
              </>
            )}
          </div>
        </>
      )}
    </LayoutDetailPage>
  );
};

export default Characters;
