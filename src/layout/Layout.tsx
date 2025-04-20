import { Outlet } from 'react-router-dom';
import LandingPage from '../pages/landingPage/LandingPage.tsx';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import { useState } from 'react';
import './Layout.scss';
import useKeycloak from '../hooks/useKeycloak.ts';

const Layout = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const { authenticated } = useKeycloak();

  return (
    <>
      {!authenticated ? (
        <LandingPage />
      ) : (
        <div className='layout'>
          <div className='layout__sidebar'>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className='layout__main'>
            <div className='layout__main--navbar'>
              <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className='layout__main--outlet'>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
