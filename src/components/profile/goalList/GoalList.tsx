import { useQuery } from '@tanstack/react-query';
import { getGoals } from '@/api/goal.ts';
import { CircularProgress } from '@mui/material';
import Snackbar from '@/components/task/alert/Alert.tsx';
import './GoalList.scss';
import AddGoal from '@/components/profile/addGoal/AddGoal.tsx';

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
        <AddGoal />
      </div>
    );
  }

  return (
    <div className='goal-list'>
      <h2>Goals</h2>
      {data.map((goal) => {
        return (
          <div key={goal.id} className='goalList__item'>
            <h3>{goal.name}</h3>
            <p>{goal.description}</p>
          </div>
        );
      })}
      <AddGoal />
    </div>
  );
};
export default GoalList;
