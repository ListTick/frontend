import dayjs from 'dayjs';
import { KeycloakProfile } from 'keycloak-js';
import React, { useMemo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './Intro.scss'
import { motivationalQuotes } from '@/components/home/Intro/MotivationQuotes.ts';

'MotivationQuotes.ts'

interface User {
  id: string | undefined;
  email: string;
  roles: string[];
  profile: KeycloakProfile | null;
}

interface IntroProps {
  user: User;
}

const Intro: React.FC<IntroProps> = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 22) return 'Good evening';
    return 'Good night';
  };

  const dayOfMonth = new Date().getDate();
  const quoteOfTheDay = motivationalQuotes[(dayOfMonth - 1) % motivationalQuotes.length];

  return (
    <div className='intro'>
      <h2>{`${getGreeting()} ${user.profile?.firstName}`}</h2>
      <div className='intro__content'>
        <div className='intro__content__calendar'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar referenceDate={dayjs()} views={['year', 'month', 'day']} />
          </LocalizationProvider>
        </div>
        <div className='intro__content__quote'>
          <p>{quoteOfTheDay}</p>
        </div>

      </div>
    </div>
  );
};

export default Intro;