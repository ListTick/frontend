import dayjs from 'dayjs';
import { KeycloakProfile } from 'keycloak-js';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './Intro.scss'

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
  return (
    <div className="intro">
      <div className="intro__content">
        <h2>{`Hey ${user.profile?.firstName}`}</h2>
        <div className="intro__content__calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              referenceDate={dayjs()}
              views={['year', 'month', 'day']}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default Intro;