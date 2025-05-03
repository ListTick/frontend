import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Task } from '@/types/task';
import { createTask, deleteTask, updateTask } from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './EditTask.scss';
import TagListClickable from '@/components/task/tagListClickable/TagListClickable.tsx';
import { Tag } from '@/types/tag';

interface EditTaskProps {
  taskDetails?: Task;
  handleClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ taskDetails, handleClose }) => {
  const queryClient = useQueryClient();
  const [task, setTask] = useState<Task>({
    id: taskDetails?.id || undefined,
    name: taskDetails?.name || '',
    dueDate: taskDetails?.dueDate || '',
    pomodoroDuration: taskDetails?.pomodoroDuration || undefined,
    breakDuration: taskDetails?.breakDuration || undefined,
    totalPomodoros: taskDetails?.totalPomodoros || undefined,
    completedPomodoros: taskDetails?.completedPomodoros || undefined,
    isCompleted: taskDetails?.isCompleted || false,
    tag: taskDetails?.tag || undefined
  });
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>(taskDetails?.tag?.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const postMutation = useMutation({
    mutationFn: () => createTask(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleClose();
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: () => updateTask(task, task.id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleClose();
    }
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

  return (
    <div className='add-new-task'>
      <div className='add-new-task__content'>
        <h2>{taskDetails ? 'Edit Task' : 'New Task'}</h2>
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
          variant='filled'
          value={task.dueDate}
          onChange={handleChange}
        />
        <h2>Pomodoro</h2>
        <div className='add-new-task__content--pomodoro-duration'>
          <TextField
            id='pomodoroDuration'
            type='number'
            name='pomodoroDuration'
            label='Pomodoro Duration'
            variant='filled'
            value={task.pomodoroDuration}
            onChange={handleChange}
          />
          <TextField
            id='breakDuration'
            type='number'
            name='breakDuration'
            label='Break Duration'
            variant='filled'
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
            variant='filled'
            value={task.completedPomodoros}
            onChange={handleChange}
          />
          <TextField
            id='totalPomodoros'
            type='number'
            name='totalPomodoros'
            label='Total Pomodoros'
            variant='filled'
            value={task.totalPomodoros}
            onChange={handleChange}
          />
        </div>
        <div>
          <h2>Tags</h2>
          <TagListClickable
            handleTagClick={(tag: Tag) => {
              if (task.tag?.id === tag.id) {
                setTask({ ...task, tag: undefined });
                setSelectedTagId(tag.id);
                return;
              }
              setTask({ ...task, tag });
            }}
            selectedTagId
          />
        </div>
        <div className='add-new-task__content--buttons'>
          {taskDetails ? (
            <Button variant='contained' size='large' color='error' onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <div />
          )}
          <Button variant='contained' size='large' onClick={handleTask}>
            {taskDetails ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
