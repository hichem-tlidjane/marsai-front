// import LanguagePicker from '../components/base/LanguagePicker';
import { useEffect, useState } from 'react';
import MovieCard from '../components/base/MovieCard';
import TopPage from '../components/base/TopPage';
import { useTranslation } from 'react-i18next';
import PaginationMenu from '../components/base/PaginationMenu';
import { useDebouncedCallback } from 'use-debounce';
import TopPageTwo from '../components/base/TopPageTwo';
import TitlePage from '../components/base/TitlePage';

function GalleryPage() {
  const { t } = useTranslation();
  const target = 'gallery.page.';
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('all');
  const [search, setSearch] = useState('');
  const [movieData, setMovieData] = useState([]);

  const debounced = useDebouncedCallback(e => {
    if (search === e) return;
    setSearch(e);
    setPage(1);
  }, 500);

  useEffect(() => {
    async function getMovieData() {
      try {
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
  }, [type, search, page]);

  return (
    <>
      <TopPageTwo />
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <TitlePage className="text-start items-start max-w-md">
            {t(target + 'titlePart1')}{' '}
            <strong className="text-accent">{t(target + 'titlePart2')}</strong>
          </TitlePage>
          <p className="text-dark mb-12 max-w-md">{t(target + 'paragraph')}</p>
          <form
            className="flex flex-row gap-6 mb-12"
            onSubmit={e => e.preventDefault()}
          >
            <div className="flex-1 text-dark">
              <label htmlFor="type" hidden>
                {t(target + 'videoClassification')}
              </label>

              <select
                className="w-full bg-secondary px-2 py-2 rounded-md outline-2 outline-neutral-400 focus:outline-neutral-100"
                onChange={e => {
                  setType(e.target.value);
                  setPage(1);
                }}
                name="type"
                id="type"
              >
                <option value="all">{t(target + 'all')}</option>
                <option value="hybrid">{t(target + 'hybridOnly')}</option>
                <option value="fullai">{t(target + 'fullAIOnly')}</option>
              </select>
            </div>
            <div className="flex-1 text-dark">
              <label htmlFor="searchbar" hidden>
                {t(target + 'search')}
              </label>
              <input
                className="w-full outline-2 outline-neutral-400 rounded-sm pl-2 py-1.5 focus:outline-neutral-100"
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6 md:mb-12 md:gap-12">
            {movieData.map((e, index) => (
              <MovieCard key={index} data={e} />
            ))}
          </div>
          <div className="text-white flex items-center justify-center">
            <PaginationMenu total={total} page={page} setPage={setPage} />
          </div>
        </div>
      </section>
    </>
  );
}

export default GalleryPage;
