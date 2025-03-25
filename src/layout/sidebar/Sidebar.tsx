import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import './Sidebar.scss';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('lists');
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className='sidebar'>
      <ul>
        <li>
          <div className='sidebar__tab logo' onClick={() => handleTabChange('')}>
            <FactCheckIcon fontSize='medium' />
          </div>
        </li>
        <li>
          <div className={`sidebar__tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('')}>
            <HomeIcon fontSize='medium' />
            <p>Home</p>
          </div>
        </li>
        <li className='sidebar__lists'>
          <div
            className={`sidebar__tab ${activeTab === 'lists' ? 'active' : ''}`}
            onClick={() => handleTabChange('lists')}
          >
            <FormatListBulletedIcon fontSize='medium' />
            <p>Lists</p>
          </div>
        </li>
        <li className='sidebar__tasks'>
          <div
            className={`sidebar__tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => handleTabChange('tasks')}
          >
            <TaskAltIcon fontSize='medium' />
            <p>Tasks</p>
          </div>
        </li>
        <li className='sidebar__notes'>
          <div
            className={`sidebar__tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => handleTabChange('notes')}
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
