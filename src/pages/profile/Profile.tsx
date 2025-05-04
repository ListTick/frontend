import './Profile.scss';
import ProfileSettings from '@/components/profile/profileSettings/ProfileSettings.tsx';
import GoalList from '@/components/profile/goalList/GoalList.tsx';
import UserProfile from '@/components/profile/userProfile/UserProfile.tsx';

const Profile = () => {
  return (
    <div className='profile'>
      <div className='profile__goals'>
        <GoalList />
      </div>
      <div className='profile__user'>
        <UserProfile />
      </div>
      <div className='profile__settings'>
        <ProfileSettings />
      </div>
    </div>
  );
};

export default Profile;
