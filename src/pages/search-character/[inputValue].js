import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../action";
import {
  AlertWarning,
  Loading,
  MainCard,
  TitleSection,
} from "../../components";
import { For, RenderIfFalse, RenderIfTrue } from "../../utils";

const { getCharacterSearch } = action;

const SearchCharacter = () => {
  const router = useRouter();
  const { inputValue } = router.query;
  const value = inputValue?.split(" ")?.join("%20");

  const [resultCharacter, setResultCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (keyword) => {
    const responseCharacter = await getCharacterSearch(keyword);
    if (responseCharacter !== undefined) setResultCharacter(responseCharacter);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getData(value);
  }, [inputValue]);

  return (
    <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 pt-4 pb-8 min-h-screen">
      <div className="container flex items-center pt-4 pb-6">
        <TitleSection centerText>Result of {inputValue}</TitleSection>
      </div>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <div className="container px-0 lg:px-4">
          <RenderIfTrue isTrue={resultCharacter.length > 0}>
            <div className="sm:flex items-center mb-4 py-4 hidden">
              <div className="flex-grow h-px bg-gray-400"></div>
              <h1 className="flex-shrink text-slate-400 px-4 font-semibold text-2xl md:text-3xl pb-2 selection:bg-emerald-500 selection:text-emerald-900">
                Character: {inputValue}
              </h1>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            <div className="mb-4 py-4 sm:hidden">
              <h1 className="text-2xl text-center selection:bg-emerald-500 selection:text-emerald-900 text-slate-400">
                Character: {inputValue}
              </h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 my-6">
              <For
                each={resultCharacter}
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
        </div>
        <RenderIfFalse isFalse={resultCharacter.length > 0}>
          <AlertWarning message="Character anime yang kamu cari tidak ada, coba masukkan keyword yang benar." />
        </RenderIfFalse>
      </RenderIfFalse>
    </section>
  );
};

export default SearchCharacter;
