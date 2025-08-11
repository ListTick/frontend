import { CircularProgress, TablePagination } from '@mui/material';
import { getArchivedTasksByUserId } from '@/api/task';
import React, { useState } from 'react';
import { Task } from '@/types/task';
import TaskItem from '../taskList/task/TaskItem';
import './ArchivedTaskList.scss';
import { useQuery } from '@tanstack/react-query';
import Snackbar from '@mui/material/Snackbar';

interface TaskListProps {
  onPomodoroClick: (task: Task) => void;
  filterByTagId: string | null;
}

const ArchivedTaskList: React.FC<TaskListProps> = ({ onPomodoroClick, filterByTagId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['archived-tasks', currentPage, rowsPerPage],
    queryFn: () => getArchivedTasksByUserId(currentPage, rowsPerPage, filterByTagId)
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
  }

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <div className='taskList'>
      {data &&
        data.tasks.map((task) => {
          return <TaskItem key={task.id} task={task} onPomodoroClick={onPomodoroClick} />;
        })}
      <TablePagination
        component='div'
        count={data.totalElements || 0}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage='Rows:'
        className='customTablePagination'
      />
    </div>
  );
};

export default ArchivedTaskList;
