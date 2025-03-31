import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes';
import './Navbar.scss';

type NavbarProps = {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
};

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <header className='navbar'>
      <ul className='navbar__list'>
        <li>
          <div
            className={`navbar__list--home navbar__tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('home');
              navigate(AppRoutes.HOME);
            }}
          >
            <HomeIcon fontSize='medium' />
            <p>Home</p>
          </div>
        </li>
        <li>
          <div
            className={`navbar__list--lists navbar__tab ${activeTab === 'lists' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('lists');
              navigate(AppRoutes.LISTS);
            }}
          >
            <FormatListBulletedIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div
            className={`navbar__list--tasks navbar__tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('tasks');
              navigate(AppRoutes.TASKS);
            }}
          >
            <TaskAltIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div
            className={`navbar__list--notes navbar__tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('notes');
              navigate(AppRoutes.NOTES);
            }}
          >
            <StickyNote2Icon fontSize='medium' />
          </div>
        </li>
        <li>
          <div
            className={`navbar__list--notifications navbar__tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('notifications');
              navigate(AppRoutes.NOTIFICATIONS);
            }}
          >
            <NotificationsIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div className='navbar__list--group'>
            <div
              className={`navbar__list--notifications-desktop navbar__tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('notifications');
                navigate(AppRoutes.NOTIFICATIONS);
              }}
            >
              <NotificationsIcon fontSize='medium' />
            </div>
            <div
              className={`navbar__list--profile navbar__tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('profile');
                navigate(AppRoutes.PROFILE);
              }}
            >
              <AccountBoxIcon fontSize='medium' />
            </div>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
