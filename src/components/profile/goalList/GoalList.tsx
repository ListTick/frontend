import { useQuery } from '@tanstack/react-query';
import { getGoals } from '@/api/goal.ts';
import { Button, CircularProgress } from '@mui/material';
import Snackbar from '@/components/task/alert/Alert.tsx';
import './GoalList.scss';

const GoalList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['goals'],
    queryFn: getGoals
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  if (data.length === 0) {
    return (
      <div className='goal-list'>
        <h2>No goals added!</h2>
      </div>
    );
  }

  return (
    <div className='goal-list'>
      <h2>Goals</h2>
      {data.map((goal) => {
        return (
          <div>
            <div key={goal.id} className='goalList__item'>
              <h3>{goal.name}</h3>
              <p>{goal.description}</p>
            </div>
            <Button>Add Goal</Button>
          </div>
        );
      })}
    </div>
  );
};
export default GoalList;
