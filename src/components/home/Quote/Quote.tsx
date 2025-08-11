import { motivationalQuotes } from '@/components/home/Quote/MotivationQuotes.ts';

const Quote = () => {
  const dayOfMonth = new Date().getDate();
  const quoteOfTheDay = motivationalQuotes[(dayOfMonth - 1) % motivationalQuotes.length];

  return (
    <div className='intro__content__quote'>
      <p>{quoteOfTheDay}</p>
    </div>

  );
};
export default Quote;
