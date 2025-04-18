import { Button } from '@mui/material';
import './Profile.scss';
import useKeycloak from '../../hooks/useKeycloak.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.ts';

const Profile = () => {
  const keycloak = useKeycloak();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(AppRoutes.HOME, { replace: true });
    void keycloak.logout();
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
