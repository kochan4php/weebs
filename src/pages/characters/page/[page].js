import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import action from "../../../action";
import {
  Button,
  ErrorMessage,
  Loading,
  MainCard,
  TitleSection,
} from "../../../components";
import { For, RenderIfFalse, RenderIfTrue } from "../../../utils";

const { getCharactersWithPagination } = action;

const CharacterPagination = () => {
  const router = useRouter();
  const { page } = router.query;

  const [paginate, setPaginate] = useState({});
  const [jikanCharacters, setJikanCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const previousPageHandler = () => {
    setIsLoading(true);
    if (page > 2) router.push(`/characters/page/${parseInt(page) - 1}`);
    else router.push(`/characters`);
  };

  const nextPageHandler = () => {
    setIsLoading(true);
    router.push(`/characters/page/${parseInt(page) + 1}`);
  };

  const getData = async (page = undefined) => {
    const res = await getCharactersWithPagination(page);
    if (res !== undefined) {
      setJikanCharacters(await res.data);
      setPaginate(await res.pagination);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <>
      <RenderIfTrue isTrue={isLoading}>
        <Loading />
      </RenderIfTrue>
      <RenderIfFalse isFalse={isLoading}>
        <section className="min-w-full py-4">
          <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 pt-4 pb-7">
            <TitleSection>Top Characters</TitleSection>
          </div>
          <div className="container px-0 lg:px-4">
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
              <div className="md:hidden container my-6 flex justify-center items-center">
                <div>
                  <p className="text-lg md:text-xl text-center">
                    Page {paginate.current_page} of {paginate.last_visible_page}
                  </p>
                </div>
              </div>
              <div className="container flex gap-6 justify-center my-6">
                <Button
                  width="w-full md:w-1/4"
                  bgcolor="bg-pink-700"
                  onClick={previousPageHandler}
                >
                  &laquo; Prev
                </Button>
                <div className="hidden md:flex items-center justify-center">
                  <p className="text-lg md:text-xl text-center">
                    Page {paginate.current_page} of {paginate.last_visible_page}
                  </p>
                </div>
                <RenderIfTrue isTrue={paginate.has_next_page}>
                  <Button
                    width="w-full md:w-1/4"
                    bgcolor="bg-pink-700"
                    onClick={nextPageHandler}
                  >
                    Next &raquo;
                  </Button>
                </RenderIfTrue>
              </div>
            </RenderIfTrue>
            <RenderIfFalse isFalse={jikanCharacters.length > 0}>
              <div className="container">
                <ErrorMessage message="Gagal mengambil data dari API, coba refresh ulang browsernya" />
              </div>
            </RenderIfFalse>
          </div>
        </section>
      </RenderIfFalse>
    </>
  );
};

export default CharacterPagination;
