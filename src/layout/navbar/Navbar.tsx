import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../types/routes';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__list--home'>
          <IconButton color='inherit' onClick={() => navigate(AppRoutes.HOME)}>
            <HomeIcon fontSize='medium' />
            <h4>ListTick</h4>
          </IconButton>
        </li>
        <li className='navbar__list--lists'>
          <IconButton color='inherit' onClick={() => navigate(AppRoutes.LISTS)}>
            <FormatListBulletedIcon fontSize='medium' />
          </IconButton>
        </li>
        <li className='navbar__list--tasks'>
          <IconButton color='inherit' onClick={() => navigate(AppRoutes.TASKS)}>
            <TaskAltIcon fontSize='medium' />
          </IconButton>
        </li>
        <li className='navbar__list--notes'>
          <IconButton color='inherit' onClick={() => navigate(AppRoutes.NOTES)}>
            <StickyNote2Icon fontSize='medium' />
          </IconButton>
        </li>
        <li className='navbar__list--settings'>
          <IconButton color='inherit' onClick={() => navigate(AppRoutes.SETTINGS)}>
            <SettingsIcon fontSize='medium' />
          </IconButton>
        </li>
        <li className='navbar__list--profile'>
          <IconButton color='inherit' onClick={() => navigate(AppRoutes.PROFILE)}>
            <AccountBoxIcon fontSize='medium' />
          </IconButton>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
