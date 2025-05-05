import { ColorItem } from '@/components/profile/colorItem/ColorItem.tsx';
import './ProfileSettings.scss';
import { Button, CircularProgress } from '@mui/material';
import useKeycloak from '@/hooks/useKeycloak.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes.ts';
import { getAccountSettings } from '@/api/account.ts';
import { useQuery } from '@tanstack/react-query';
import Snackbar from '@/components/task/alert/Alert.tsx';

const ProfileSettings = () => {
  const keycloak = useKeycloak();
  const navigate = useNavigate();

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

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['settings'],
  //   queryFn: getAccountSettings
  // });
  //
  // console.log(data);
  // if (isLoading) {
  //   return <CircularProgress />;
  // }
  //
  // if (isError || !data) {
  //   return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  // }

  const handleLogout = async () => {
    navigate(AppRoutes.HOME, { replace: true });
    await keycloak.logout();
  };

  return (
    <div className='profile-settings'>
      <h2>Settings</h2>
      <h3>Pomodoro Settings</h3>
      <div>
        <p>Work duration: {settings.default_pomodoro_duration} min</p>
        <p>Short break: {settings.default_pomodoro_break_duration} min</p>
        <p>Long break every: {settings.default_pomodoro_long_break_interval} sessions</p>
        <p>Long break duration: {settings.default_pomodoro_long_break_duration} min</p>
        <p>Break reminder: {settings.default_notification_break_reminder_time} min</p>
        <p>Long breaks enabled: {settings.is_long_break_enabled ? 'Yes' : 'No'}</p>
      </div>

      <h3>Colours</h3>
      <div>
        <ColorItem label='Task' color={settings.default_task_tag_colour} />
        <ColorItem label='Note' color={settings.default_note_tag_colour} />
        <ColorItem label='Shopping list' color={settings.default_shoppinglist_category_colour} />
        <ColorItem label='Bucket list' color={settings.default_bucketlist_category_colour} />
        <ColorItem label='Goal' color={settings.default_goal_category_colour} />
      </div>

      <Button variant='contained' onClick={() => handleLogout()}>
        Logout
      </Button>
    </div>
  );
};
export default ProfileSettings;
