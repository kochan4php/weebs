import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../action";
import {
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../components";
import { For, RenderIfFalse, RenderIfTrue } from "../../utils";

const { getCharactersWithPagination } = action;

const Characters = () => {
  const router = useRouter();
  const { page } = router.query;

  const [jikanCharacters, setJikanCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getData = async (page) => {
    const getData = await getCharactersWithPagination(page);
    console.log(getData);
    if (getData) {
      setJikanCharacters(getData.data);
    } else {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 pt-4 pb-8 min-h-screen">
      <RenderIfTrue isTrue={isError}>
        <div className="container">
          <ErrorMessage message="Ada sedikit kesalahan pada API nya, coba refresh kembali." />
        </div>
      </RenderIfTrue>
      <RenderIfFalse isFalse={isError}>
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 pt-4 pb-7">
          <TitleSection>Top Characters</TitleSection>
        </div>
        <div className="container px-0 lg:px-4">
          <RenderIfTrue isTrue={isLoading}>
            <Loading />
          </RenderIfTrue>
          <RenderIfFalse isFalse={isLoading}>
            <RenderIfTrue isTrue={jikanCharacters.length > 0}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
                <For
                  each={jikanCharacters}
                  render={({ mal_id, images, name }) => (
                    <MainCard
                      key={mal_id}
                      path={`/characters/details/${mal_id}`}
                      id={mal_id}
                      image={images?.webp?.image_url}
                      title={name}
                      py="py-5"
                      fontsize="text-base"
                      centerText
                    />
                  )}
                />
              </div>
            </RenderIfTrue>
            <RenderIfFalse isFalse={jikanCharacters.length > 0}>
              <div className="container">
                <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
              </div>
            </RenderIfFalse>
          </RenderIfFalse>
        </div>
      </RenderIfFalse>
    </section>
  );
};

export default Characters;
