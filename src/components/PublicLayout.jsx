import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
