import { TbTargetArrow } from 'react-icons/tb';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { useTranslation, Trans } from 'react-i18next';
import TitleSection from './base/TitleSection';
import Card from './base/Card';

function ObjectivesFestival() {
  const { t } = useTranslation();

  const objectifsData = [
    {
      id: 1,
      icon: <TbTargetArrow />,
      title: t('objectif.items.0.title'),
      text: t('objectif.items.0.text'),
    },
    {
      id: 2,
      icon: <AiOutlineThunderbolt />,
      title: t('objectif.items.1.title'),
      text: t('objectif.items.1.text'),
    },
    {
      id: 3,
      icon: <MdOutlineRocketLaunch />,
      title: t('objectif.items.2.title'),
      text: t('objectif.items.2.text'),
    },
  ];

  return (
    <section className="section text-white ">
      <div className="max-w-5xl mx-auto">
        <TitleSection hasUnderline={true} underlineColor="bg-white">
          <Trans
            i18nKey="objectif.title"
            components={[<strong key="highlight" className="text-accent" />]}
          />
        </TitleSection>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {objectifsData.map((obj, i) => (
            <Card
              key={obj.id}
              icon={obj.icon}
              title={obj.title}
              subtitle=""
              text={obj.text}
              hasUnderline={false}
              className={i == 2 && 'col-span-2 lg:col-span-1 '}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ObjectivesFestival;
/* flex items-center gap-4 flex-col md:items-start lg:flex-row */
