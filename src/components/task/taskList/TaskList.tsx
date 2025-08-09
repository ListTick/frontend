import { CircularProgress } from '@mui/material';
import { getTasksByUserId } from '@/api/task';
import TaskItem from './task/TaskItem';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Task } from '@/types/task';
import NewTask from './newTask/NewTask';
import { useQuery } from '@tanstack/react-query';
import './TaskList.scss';

interface TaskListProps {
  onPomodoroClick: (task: Task) => void;
  filterByTagId: string | null;
}

const TaskList: React.FC<TaskListProps> = ({ onPomodoroClick, filterByTagId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasksByUserId(filterByTagId)
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
      {data.map((task) => {
        return <TaskItem key={task.id} task={task} onPomodoroClick={onPomodoroClick} />;
      })}
      <NewTask />
    </div>
  );
};

export default TaskList;
