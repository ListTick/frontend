import { CircularProgress } from '@mui/material';
import { getTasksByUserId } from '@/api/task';
import TaskItem from './task/TaskItem';
import React from 'react';
import Snackbar from '../alert/Alert';
import { Task } from '@/types/task';
import NewTask from './newTask/NewTask';
import { useQuery } from '@tanstack/react-query';
import './TaskList.scss';

interface TaskListProps {
  onPomodoroClick: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onPomodoroClick }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasksByUserId(null)
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
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
