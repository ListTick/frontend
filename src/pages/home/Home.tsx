import { useCurrentUser } from '@/hooks/useCurrentUser.ts';
import './Home.scss';
import Expense from '@/components/home/Expense/Expense.tsx';
import Intro from '@/components/home/Intro/Intro.tsx';

const Home = () => {
  const user = useCurrentUser();

  return (
    <div className='home'>
      <div className='home__content'>
        <div className='home__content__introduction'>
          <Intro user={user}/>
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
