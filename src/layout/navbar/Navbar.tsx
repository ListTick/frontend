import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../types/routes';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className='navbar'>
      <ul className='navbar__list'>
        <li>
          <div className='navbar__list--lists navbar__tab' onClick={() => navigate(AppRoutes.LISTS)}>
            <FormatListBulletedIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div className='navbar__list--tasks navbar__tab' onClick={() => navigate(AppRoutes.TASKS)}>
            <TaskAltIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div className='navbar__list--notes navbar__tab' onClick={() => navigate(AppRoutes.NOTES)}>
            <StickyNote2Icon fontSize='medium' />
          </div>
        </li>
        <li>
          <div className='navbar__list--notifications navbar__tab' onClick={() => navigate(AppRoutes.NOTIFICATIONS)}>
            <NotificationsIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div className='navbar__list--group'>
            <div
              className='navbar__list--notifications-desktop navbar__tab'
              onClick={() => navigate(AppRoutes.NOTIFICATIONS)}
            >
              <NotificationsIcon fontSize='medium' />
            </div>
            <div className='navbar__list--profile navbar__tab' onClick={() => navigate(AppRoutes.PROFILE)}>
              <AccountBoxIcon fontSize='medium' />
            </div>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
