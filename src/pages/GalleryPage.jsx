// import LanguagePicker from '../components/base/LanguagePicker';
import { useEffect, useState } from 'react';
import MovieCard from '../components/base/MovieCard';
import TopPage from '../components/base/TopPage';
import { useTranslation } from 'react-i18next';
import PaginationMenu from '../components/base/PaginationMenu';
import { useDebouncedCallback } from "use-debounce";


function GalleryPage() {
  const { t } = useTranslation();
  const target = 'gallery.page.';
  const [page, setPage] = useState(1);
  const [isPageChange, setIsPageChange] = useState(false);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('all');
  const [search, setSearch] = useState('');
  const [movieData, setMovieData] = useState([]);
  const debounced = useDebouncedCallback((e) => {
    setSearch(e);
    setIsPageChange(false);
  }, 500);


  useEffect(() => {
    async function getMovieData() {
      try {
        if (!isPageChange) {
          setPage(1);
          setIsPageChange(true);
        }
        const res = await fetch(
          import.meta.env.VITE_SERVER_ADDRESS +
          '/movies/?page=' +
          page +
          '&type=' +
          type +
          '&search=' +
          search,
          {
            method: 'GET',
          }
        );
        const json = await res.json();
        if (res.ok) {
          console.log(json);
          setMovieData(json.data);
          setTotal(json.total);
          return json;
        } else {
          console.log(json);
        }
      } catch (e) {
        console.error('error: ', e);
      }
    }
    getMovieData();
  }, [page, type, search, isPageChange]);

  return (
    <div>
      <TopPage className="pt-20 text-white">
        <h1 className="">{t(target + 'titlePart1')}</h1>
        <h1 className="text-accent">{t(target + 'titlePart2')}</h1>
      </TopPage>
      <div className="text-white flex flex-col items-center">
        <div className="pb-5 pt-5 flex flex-col items-center">
          <div className="flex flex-col items-center w-5/6 gap-4 pb-4">
            <p>{t(target + 'paragraph')}</p>
          </div>
        </div>

        <form
          className="border rounded-md border-white flex flex-row  px-4 pb-4 pt-2 mb-8 gap-x-10"
          action=""
        >
          {/* <p>Classification</p> */}

          <div>
            <label htmlFor="type" hidden>
              {t(target + 'videoClassification')}
            </label>

            <select
              className="w-fit outline-2  bg-secondary px-2 py-2 rounded-md mt-2 border-0 border-zinc-200"
              onChange={e => {
                setType(e.target.value);
                setIsPageChange(false);
              }}
              name="type"
              id="type"
            >
              <option value="all">{t(target + 'all')}</option>
              <option value="hybrid">{t(target + 'hybridOnly')}</option>
              <option value="fullai">{t(target + 'fullAIOnly')}</option>
            </select>
          </div>

          <div className="pt-2">
            <label htmlFor="searchbar" hidden>
              {t(target + 'search')}
            </label>
            <input
              className="outline-2 rounded-sm pl-2 py-1.5 border-0  focus:outline-neutral-100"
              id="searchbar"
              type="text"
              placeholder={t(target + 'searchPlaceholder')}
              onChange={e => {
                debounced(e.target.value);
              }}
              title={t(target + 'search')}
            ></input>
          </div>
        </form>

        <div className="flex flex-col gap-y-6 gap-x-4 items-center pb-6 sm:flex-row sm:w-11/12 sm:flex-wrap sm:justify-evenly sm:flex-start">
          {movieData.map((e, index) => (
            <MovieCard key={index} data={e} />
          ))}
        </div>
        <PaginationMenu
          total={total}
          page={page}
          setPage={setPage}
          setIsPageChange={setIsPageChange}
        />
      </div>
    </div>
  );
}

export default GalleryPage;
