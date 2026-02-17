import { useTranslation } from 'react-i18next';
import flag_english from '../assets/united-kingdom.png';
import flag_french from '../assets/france.png';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLanguage = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button onClick={handleLanguageChange} className="">
      {i18n.language === 'fr' ? (
        <img src={flag_english} alt={'English'} className="w-6" />
      ) : (
        <img src={flag_french} alt={'Français'} className="w-6" />
      )}
    </button>
  );
}
