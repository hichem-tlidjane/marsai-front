import { useTranslation } from 'react-i18next';

export const useFormatDate = () => {
  const { t, i18n } = useTranslation();

  const formatDate = dateStr => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(i18n.language, options);
    return `${t('events.conference.program.datePrefix')}${formattedDate}`;
  };

  const formatTime = dateStr => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return { formatDate, formatTime };
};
