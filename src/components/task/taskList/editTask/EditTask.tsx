import { TextField, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { TaskWithTagId } from '@/types/task';
import { createTask, deleteTask, updateTask } from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './EditTask.scss';
import TagListClickable from '@/components/task/tagListClickable/TagListClickable.tsx';
import { Tag } from '@/types/tag';

interface EditTaskProps {
  taskDetails?: TaskWithTagId;
  handleClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ taskDetails, handleClose }) => {
  const queryClient = useQueryClient();
  const [task, setTask] = useState<TaskWithTagId>({
    id: taskDetails?.id || undefined,
    name: taskDetails?.name || '',
    dueDate: taskDetails?.dueDate || '',
    pomodoroDuration: taskDetails?.pomodoroDuration || undefined,
    breakDuration: taskDetails?.breakDuration || undefined,
    totalPomodoros: taskDetails?.totalPomodoros || undefined,
    completedPomodoros: taskDetails?.completedPomodoros || undefined,
    isCompleted: taskDetails?.isCompleted || false,
    tagId: taskDetails?.tagId || undefined
  });
  const [selectedTagId, setSelectedTagId] = useState<string | null>(taskDetails?.tagId || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const onGenericError = (error: any) => {
    const data = error?.response?.data;
    if (data && typeof data === 'object') {
      const messages = Object.values(data).join(', ');
      setErrorMessage(String(messages));
    } else if (typeof error?.message === 'string') {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('An unexpected error occurred.');
    }
  };

  const postMutation = useMutation({
    mutationFn: () => createTask(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleClose();
    },
    onError: onGenericError
  });

  const updateTaskMutation = useMutation({
    mutationFn: () => updateTask(task, task.id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleClose();
    },
    onError: onGenericError
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleClose();
    },
    onError: onGenericError
  });

  const handleTask = async () => {
    if (task.id != null) {
      updateTaskMutation.mutate(undefined, {});
    } else {
      postMutation.mutate();
    }
  };

  const handleDelete = () => {
    if (task.id != null) {
      deleteMutation.mutate();
    }
  };

  const handleTagClick = (tag: Tag) => {
    setTask((prevTask) => ({
      ...prevTask,
      tagId: prevTask.tagId === tag.id ? undefined : tag.id
    }));
    setSelectedTagId((prevSelectedTagId) => {
      if (prevSelectedTagId === tag.id) {
        return null;
      }
      return tag.id as string;
    })
  };

  return (
    <div className='add-new-task'>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <div className='add-new-task__content'>
        <h3>{taskDetails ? 'Edit Task' : 'New Task'}</h3>
        <TextField
          id={'name'}
          name='name'
          label={'Name'}
          variant={'outlined'}
          type={'text'}
          value={task.name}
          onChange={handleChange}
        ></TextField>
        <TextField
          id='dueDate'
          type='date'
          name='dueDate'
          variant='outlined'
          value={task.dueDate}
          onChange={handleChange}
        />
        <h3>Pomodoro</h3>
        <div className='add-new-task__content--pomodoro-duration'>
          <TextField
            id='pomodoroDuration'
            type='number'
            name='pomodoroDuration'
            label='Pomodoro Duration'
            variant='outlined'
            value={task.pomodoroDuration}
            onChange={handleChange}
          />
          <TextField
            id='breakDuration'
            type='number'
            name='breakDuration'
            label='Break Duration'
            variant='outlined'
            value={task.breakDuration}
            onChange={handleChange}
          />
        </div>
        <div className='add-new-task__content--pomodoro-quantity'>
          <TextField
            id='completedPomodoros'
            type='number'
            name='completedPomodoros'
            label='Completed Pomodoros'
            variant='outlined'
            value={task.completedPomodoros}
            onChange={handleChange}
          />
          <TextField
            id='totalPomodoros'
            type='number'
            name='totalPomodoros'
            label='Total Pomodoros'
            variant='outlined'
            value={task.totalPomodoros}
            onChange={handleChange}
          />

        </div>
        <div>
          <h3>Tags</h3>
          <TagListClickable handleTagClick={handleTagClick} selectedTagId={selectedTagId}/>
        </div>
        <div className='add-new-task__content--buttons'>
          {taskDetails ? (
            <div className='add-new-task__content--buttons_left'>
            <Button variant='contained' size='small' color='error' onClick={handleDelete}>
              Delete
            </Button>
            </div>
          ) : (
            <div />
          )}
          <div className='add-new-task__content--buttons_right'>
          <Button variant='contained' size='small' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' size='small' onClick={handleTask}>
            {taskDetails ? 'Update' : 'Create'}
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
