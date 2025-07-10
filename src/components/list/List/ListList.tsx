import { CircularProgress } from '@mui/material';
import TaskItem from '@/components/list/List/List/TaskItem';
import React from 'react';
import Snackbar from '../../task/alert/Alert.tsx';
import { Task } from '@/types/task';
import NewTask from '@/components/list/List/NewList/NewTask';
import { useQuery } from '@tanstack/react-query';
import './TaskList.scss';
import { getAllShoppingListsByAccountId } from '@/api/shoppingList.ts';

interface TaskListProps {
  onPomodoroClick: (task: Task) => void;
}

const ListList: React.FC<TaskListProps> = ({ onPomodoroClick }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['shopping-lists'],
    queryFn: () => getAllShoppingListsByAccountId()
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  return (
    <div className='shoppingListList'>
      {data.map((task) => {
        return <TaskItem key={task.id} task={task} onPomodoroClick={onPomodoroClick} />;
      })}
      <NewTask />
    </div>
  );
};

export default ListList;
