import { ColorItem } from '@/components/profile/colorItem/ColorItem.tsx';
import './Settings.scss';

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


const Settings = () => {
  return (
    <div className='settings'>
      <div>
        <h2>Pomodoro </h2>
        <div>
          <p>Work duration: {settings.default_pomodoro_duration} min</p>
          <p>Short break: {settings.default_pomodoro_break_duration} min</p>
          <p>Long break every: {settings.default_pomodoro_long_break_interval} sessions</p>
          <p>Long break duration: {settings.default_pomodoro_long_break_duration} min</p>
          <p>Break reminder: {settings.default_notification_break_reminder_time} min</p>
          <p>Long breaks enabled: {settings.is_long_break_enabled ? 'Yes' : 'No'}</p>
        </div>
        <h2>Default colors</h2>
        <div className='settings__colors'>
          <ColorItem label='List' color={settings.default_note_tag_colour} />
          <ColorItem label='Task' color={settings.default_shoppinglist_category_colour} />
          <ColorItem label='Goal' color={settings.default_bucketlist_category_colour} />
          <ColorItem label='Tag' color={settings.default_goal_category_colour} />
        </div>
      </div>

    </div>
  );
};
export default Settings;
