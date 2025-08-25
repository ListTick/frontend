import { Avatar, Button } from '@mui/material';
import { useCurrentUser } from '@/hooks/useCurrentUser.ts';
import './User.scss';
import useKeycloak from '@/hooks/useKeycloak.ts'
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';

const User = () => {
  const { profile } = useCurrentUser();
  const keycloak = useKeycloak();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate(AppRoutes.HOME, { replace: true });
    await keycloak.logout();
  };

  return (
    <div className='user'>
      <div className='user__avatar'>
        <Avatar sx={{ width: 56, height: 56 }}>{profile?.firstName?.charAt(0) ?? ''}</Avatar>
      </div>
      <p>
        <strong>Email:</strong> {profile?.email}
      </p>
      <p>
        <strong>First name:</strong> {profile?.firstName}
      </p>
      <p>
        <strong>Last name:</strong> {profile?.lastName}
      </p>
      <div className='user__logout'>
      <Button variant='contained' size='small' onClick={() => handleLogout()}>
        Logout
      </Button>
      </div>
    </div>
  );
};
export default User;
