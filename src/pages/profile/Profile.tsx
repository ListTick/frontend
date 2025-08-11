import GoalList from '@/components/profile/goal/goalList/GoalList';
import User from '@/components/profile/user/User';
import Settings from '@/components/profile/settings/Settings';
import { useState } from 'react';
import ListTabButton from '@/components/list/bucket-list/ListTabButton/ListTabButton';
import './Profile.scss';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'goals' | 'user' | 'settings'>('goals');

  return (
    <div className='profile'>
      <header className="profile__header">
        <ListTabButton
          active={activeTab === 'goals'}
          onClick={() => setActiveTab('goals')}
        >
          Goals
        </ListTabButton>
        <ListTabButton
          active={activeTab === 'user'}
          onClick={() => setActiveTab('user')}
        >
          Profile
        </ListTabButton>
        <ListTabButton
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </ListTabButton>
      </header>
      <div className='profile__content'>
        {activeTab === 'goals' && (
          <div className='profile__goals'>
            <div className='profile__goals--container'>
              <GoalList />
            </div>
          </div>
        )}
        {activeTab === 'user' && (
          <div className='profile__user'>
            <div className='profile__user--container'>
              <User />
            </div>
          </div>
        )}
        {activeTab === 'settings' && (
        <div className='profile__settings'>
          <div className='profile__settings--container'>
            <Settings />
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
