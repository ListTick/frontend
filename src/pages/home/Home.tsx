import { useCurrentUser } from '@/hooks/useCurrentUser.ts';
import dayjs from 'dayjs';
import './Home.scss';
import Expense from '@/components/list/shopping-list/Expense/Expense.tsx';

const Home = () => {
  const user = useCurrentUser();

  return (
    <div className='home'>
      <div className='home__content'>
        <div className='home__content__introduction'>
          <h2>Hello, {user.profile?.firstName}</h2>
          <p className='home__date'>Today, {dayjs().format('DD MMM')}</p>
        </div>
        <div className='home__content__expenses'>
          <Expense />
        </div>
        <div className='home__content__goals'>Goals</div>
        <div className='home__content__tasks'>Recent Tasks</div>
      </div>
    </div>
  );
};

export default Home;
