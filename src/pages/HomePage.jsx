import SectionProjet from '../components/Projet';

import Hero from '../components/Hero';
import FilmsCompetition from '../components/FilmsCompet';
import FormatSelection from '../components/FormatSelection';
import Conference from '../components/Conference';
import Partner from '../components/Partner';
import StatisticalSection from '../components/StatisticalSection';
import ObjectivesFestival from '../components/ObjectivesFestival';
import PlacePlateforme from '../components/PlacePlateforme';

function HomePage() {
  return (
    <>
      <Hero />
      <SectionProjet />
      <FilmsCompetition />
      <ObjectivesFestival />
      <FormatSelection />
      <Conference />
      <PlacePlateforme />
      <StatisticalSection />
      <Partner />
    </>
  );
}

export default HomePage;
