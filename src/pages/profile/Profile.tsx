import './Profile.scss';
import GoalList from '@/components/profile/goalList/GoalList.tsx';
import User from '@/components/profile/user/User.tsx';
import Settings from '@/components/profile/settings/Settings.tsx';
import { useState } from 'react';
import { Button } from '@mui/material';

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState<'goals' | 'user' | 'settings'>('goals');

  return (
    <div className='profile'>
      <div className='profile__buttons'>
        <Button onClick={() => setSelectedSection('goals')}>Goals</Button>
        <Button onClick={() => setSelectedSection('user')}>User</Button>
        <Button onClick={() => setSelectedSection('settings')}>Settings</Button>
      </div>
      <div className='profile__content'>
        {selectedSection === 'goals' && (
          <div className='profile__goals'>
            <div className='profile__goals--container'>
              <GoalList />
            </div>
          </div>
        )}
        {selectedSection === 'user' && <User />}
        {selectedSection === 'settings' && <Settings />}
      </div>
    </div>
  );
};

export default Profile;
