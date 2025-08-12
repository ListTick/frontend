import { useCurrentUser } from '@/hooks/useCurrentUser';
import Expense from '@/components/home/Expense/Expense';
import Intro from '@/components/home/Intro/Intro';
import Quote from '@/components/home/Quote/Quote.tsx';
import './Home.scss';

const Home = () => {
  const user = useCurrentUser();

  return (
    <div className="home">
      <section className="home__section">
        <div className="section__body">
        <Intro user={user} />
        </div>
      </section>

      <section className="home__section">
        <h2>Expenses</h2>
        <Expense />
      </section>

      <section className="home__section">
        <h2>Daily quote</h2>
        <Quote />
      </section>

      {/*<section className="home__section">*/}
      {/*  <h2>Goals</h2>*/}
      {/*   TODO: Goal list */}
      {/*</section>*/}

      {/*<section className="home__section">*/}
      {/*  <h2>Recent Tasks</h2>*/}
      {/*  /!* TODO: Task list *!/*/}
      {/*</section>*/}
    </div>
  );
};

export default Home;
