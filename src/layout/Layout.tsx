import { Outlet } from 'react-router';
import Authentication from '../pages/authentication/Authentication';
import Navbar from './navbar/Navbar';
import './Layout.scss';
import Sidebar from './sidebar/Sidebar';

const Layout = () => {
  const isAuthenticated: boolean = true;

  return (
    <>
      {!isAuthenticated ? (
        <Authentication />
      ) : (
        <div className='layout'>
          <div className='layout__navbar'>
            <Navbar />
          </div>
          <div className='layout__main'>
            <div className='layout__main--sidebar'>
              <Sidebar />
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
