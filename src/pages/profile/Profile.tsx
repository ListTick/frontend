import { Avatar, Button, ToggleButton } from '@mui/material';
import './Profile.scss';
import useKeycloak from '@/hooks/useKeycloak.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes.ts';
import { useCurrentUser } from '@/hooks/useCurrentUser.ts';
import { ColorItem } from '@/components/profile/colorItem/ColorItem.tsx';

const Profile = () => {
  const keycloak = useKeycloak();
  const navigate = useNavigate();
  const { profile } = useCurrentUser();

  const handleLogout = async () => {
    navigate(AppRoutes.HOME, { replace: true });
    await keycloak.logout();
  };

  const settings = {
    default_pomodoro_duration: 25,
    default_pomodoro_break_duration: 5,
    default_pomodoro_long_break_interval: 4,
    default_pomodoro_long_break_duration: 15,
    default_notification_break_reminder_time: 3,
    is_long_break_enabled: true,
    default_task_tag_colour: '#494d50',
    default_note_tag_colour: '#494d50',
    default_shoppinglist_category_colour: '#494d50',
    default_bucketlist_category_colour: '#494d50',
    default_goal_category_colour: '#494d50'
  };

  return (
    <div className='profile'>
      <div className='profile__goals'>
        <h3>Goals</h3>
        <div className='profile__goals--container'>
          <ToggleButton value='check' selected>
            Daily
          </ToggleButton>
          <ToggleButton>Weekly</ToggleButton>
          <ToggleButton value='check'>Monthly</ToggleButton>
          <ToggleButton value='check'>Yearly</ToggleButton>
        </div>
      </div>
      <div className='profile__user'>
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
      <div className='profile__settings'>
        <div>
          <h2>Pomodoro Settings</h2>
          <div>
            <p>Work duration: {settings.default_pomodoro_duration} min</p>
            <p>Short break: {settings.default_pomodoro_break_duration} min</p>
            <p>Long break every: {settings.default_pomodoro_long_break_interval} sessions</p>
            <p>Long break duration: {settings.default_pomodoro_long_break_duration} min</p>
            <p>Break reminder: {settings.default_notification_break_reminder_time} min</p>
            <p>Long breaks enabled: {settings.is_long_break_enabled ? 'Yes' : 'No'}</p>
          </div>

          <h3>Tag Colours</h3>
          <div>
            <ColorItem label='Task' color={settings.default_task_tag_colour} />
            <ColorItem label='Note' color={settings.default_note_tag_colour} />
            <ColorItem label='Shopping list' color={settings.default_shoppinglist_category_colour} />
            <ColorItem label='Bucket list' color={settings.default_bucketlist_category_colour} />
            <ColorItem label='Goal' color={settings.default_goal_category_colour} />
          </div>
        </div>
        <Button variant='contained' onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
