import { Outlet } from 'react-router-dom';
import Authentication from '../pages/authentication/Authentication';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import { useState } from 'react';
import './Layout.scss';

const Layout = () => {
  const isAuthenticated: boolean = true;
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <>
      {!isAuthenticated ? (
        <Authentication />
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
