import { useTranslation } from 'react-i18next';
import languages from '../../data/languages';

function MovieCard({ data }) {
  const { i18n } = useTranslation();

  let language = languages.filter(elem => elem.lang === data.language)[0];
  if (language === undefined) {
    language = {
      lang: 'ZZ',
      text: 'Unknown',
      icon: '❌',
      textFr: 'Inconnu',
      textEn: 'Unknown',
    };
  }

  let english_title = data.english_title;
  let original_title = data.original_title;
  let director = data.director.firstname + ' ' + data.director.lastname;

  return (
    <div className="flex flex-col uppercase w-10/12 rounded-xl bg-primary sm:w-42 md:w-60 md:max-w-1/5">
      <div className="relative">
        <img
          className={`aspect-video w-full  object-contain rounded-t-xl bg-dark`}
          src={import.meta.env.VITE_SERVER_ADDRESS + "/" + data.cover_path}
        />
        <span
          className=" bg-secondary
                    absolute
                   right-1
                    bottom-1
                    text-center
                    text-xs
                    px-1
                    rounded-md
                    lowercase
                   "
        >
          {data.duration} s
        </span>
        <span className=" bg-secondary absolute text-center text-xs px-1 rounded-md left-1 top-1">
          {data.is_hybrid ? 'Hybrid' : 'Full-AI'}
        </span>
      </div>

      <div className="px-2 pt-1">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col  min-w-0 max-w-100">
            <p
              className="text-md font-bold truncate "
              title={data.english_title}
            >
              {english_title}
            </p>
            <p className="text-sm truncate" title={data.original_title}>
              {original_title}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col min-w-0 max-w-100">
            <p className="text-xs truncate pt-1">{director}</p>
          </div>
          <div className="flex flex-col ">
            <p className='text-xl pb-2'
              title={i18n.language === 'fr' ? language.textFr : language.textEn}
            >
              {language.icon}{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
