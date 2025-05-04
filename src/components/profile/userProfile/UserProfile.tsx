import { Avatar } from '@mui/material';
import { useCurrentUser } from '@/hooks/useCurrentUser.ts';
import './UserProfile.scss';

const UserProfile = () => {
  const { profile } = useCurrentUser();

  return (
    <div className='user-profile'>
      <h2>Profile</h2>
      <Avatar sx={{ width: 56, height: 56 }}>{profile?.firstName?.charAt(0) ?? ''}</Avatar>
      <p>
        <strong>Email:</strong> {profile?.email}
      </p>
      <p>
        <strong>First name:</strong> {profile?.firstName}
      </p>
      <p>
        <strong>Last name:</strong> {profile?.lastName}
      </p>
    </div>
  );
};
export default UserProfile;
