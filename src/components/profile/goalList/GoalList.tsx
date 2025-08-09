import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { getGoalsByUserId } from '@/api/goal.ts';
import { useQuery } from '@tanstack/react-query';
import GoalItem from '@/components/profile/goalList/goalItem/GoalItem.tsx';

const GoalList = () => {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => getGoalsByUserId()
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
  }

  return (
    <div className='taskList'>
      {data.map((goal) => {
        return <GoalItem key = {goal.id} goal={goal}/>;
      })}
    </div>
  );
};

export default GoalList;