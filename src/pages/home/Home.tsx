import { useCurrentUser } from '../../hooks/useCurrentUser.ts';
import dayjs from 'dayjs';
import './Home.scss';

const Home = () => {
  const user = useCurrentUser();

  return (
    <div className='home'>
      <h2>Hello, {user.profile?.firstName}</h2>
      <p className='home__date'>Today, {dayjs().format('DD MMM')}</p>
    </div>
  );
};

export default Home;
