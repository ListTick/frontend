import { CircularProgress } from '@mui/material';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useQuery } from '@tanstack/react-query';
import { getGoalsByUserId } from '@/api/goal.ts';
import GoalItem from '../goalItem/GoalItem.tsx';
import NewGoal from '@/components/profile/goal/newGoal/NewGoal.tsx';

interface GoalListProps {
}

const GoalList: React.FC<GoalListProps> = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => getGoalsByUserId()
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError ) {
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
        return <GoalItem key={goal.id} goal={goal} />;
      })}
      <NewGoal />
    </div>
  );
};

export default GoalList;
