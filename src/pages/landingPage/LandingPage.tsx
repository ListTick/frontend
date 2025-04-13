import './LandingPage.scss';

const LandingPage = () => {
  const handleRedirect = () => {
    // TODO Redirect to the keycloak page
    alert('Redirecting!');
  };

  return (
    <div className='landingPage'>
      <div className='landingPage__content'>
        <span className='landingPage__content--login' onClick={() => handleRedirect()}>
          Login / Register
        </span>
        <section className='landingPage__content--overview'>
          <h1>One App to Rule Your Goals</h1>
          <p>No more juggling multiple tools. Manage your goals, tasks, and shopping lists – all in one place.</p>
          <p>Use our custom Pomodoro solution to make sure the tasks get done!</p>
        </section>
        <section className='landingPage__content--features'>
          <h1>Everything You Need</h1>
          <div className='landingPage__content--features cards'>
            <div className='landingPage__feature-card'>
              <h3>Goal Management</h3>
              <p>Set and track your short and long-term goals with clarity and ease.</p>
            </div>
            <div className='landingPage__feature-card'>
              <h3>Task Manager</h3>
              <p>Organize daily tasks and prioritize what matters most.</p>
            </div>
            <div className='landingPage__feature-card'>
              <h3>Pomodoro Timer</h3>
              <p>Boost your focus with a built-in Pomodoro timer designed for productivity.</p>
            </div>
            <div className='landingPage__feature-card'>
              <h3>Smart Lists</h3>
              <p>Create, manage, and share custom to-do lists and shopping lists effortlessly.</p>
            </div>
          </div>
        </section>
        <section className='landingPage__content--whyus'>
          <h1>Why Choose ListTick?</h1>
          <div className='landingPage__content--whyus slides'>
            <p className='landingPage__whyus-slide'>
              FocusFlow combines your productivity needs into one clean, powerful tool – so you can stop app-hopping and
              start achieving more.
            </p>
            <p className='landingPage__whyus-slide'>
              It's simple, efficient, and designed to help real people stay organized without the overwhelm.
            </p>
          </div>
        </section>
        <section className='landingPage__content--join'>
          <h1>Join the Productivity Revolution</h1>
          <p>Start managing your life smarter – all from a single dashboard.</p>
          <p>
            Click <b>Login/Register</b> to get started!
          </p>
        </section>
      </div>
      <footer className='landingPage__footer'>
        <p>&copy; 2025 ListTick. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
