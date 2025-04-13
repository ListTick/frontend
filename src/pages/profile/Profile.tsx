import { Button } from '@mui/material';
import './Profile.scss';

const Profile = () => {
  const handleLogout = () => {
    alert('Logging out');
  };

  return (
    <div className='profile'>
      <div className='profile__logout'>
        <Button variant='contained' onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
