import Divider from '@mui/material/Divider';
import { Outlet } from 'react-router';
import Authentication from '../pages/authentication/Authentication';
import Navbar from './navbar/Navbar';
import './Layout.scss';

const Layout = () => {
  const isAuthenticated: boolean = false;

  return (
    <>
      {!isAuthenticated ? (
        <Authentication />
      ) : (
        <div className='layout'>
          <div className='layout__navbar'>
            <Navbar />
            <div className='layout__navbar--divider'>
              <Divider />
            </div>
          </div>
          <div className='layout__outlet'>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
