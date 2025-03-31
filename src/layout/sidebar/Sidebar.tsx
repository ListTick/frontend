import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.ts';
import './Sidebar.scss';

type SidebarProps = {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
};

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <ul>
        <li>
          <div
            className='sidebar__tab logo'
            onClick={() => {
              setActiveTab('');
              navigate(AppRoutes.HOME);
            }}
          >
            <FactCheckIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div
            className={`sidebar__tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('home');
              navigate(AppRoutes.HOME);
            }}
          >
            <HomeIcon fontSize='medium' />
            <p>Home</p>
          </div>
        </li>
        <li className='sidebar__lists'>
          <div
            className={`sidebar__tab ${activeTab === 'lists' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('lists');
              navigate(AppRoutes.LISTS);
            }}
          >
            <FormatListBulletedIcon fontSize='medium' />
            <p>Lists</p>
          </div>
        </li>
        <li className='sidebar__tasks'>
          <div
            className={`sidebar__tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('tasks');
              navigate(AppRoutes.TASKS);
            }}
          >
            <TaskAltIcon fontSize='medium' />
            <p>Tasks</p>
          </div>
        </li>
        <li className='sidebar__notes'>
          <div
            className={`sidebar__tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('notes');
              navigate(AppRoutes.NOTES);
            }}
          >
            <StickyNote2Icon fontSize='medium' />
            <p>Notes</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
