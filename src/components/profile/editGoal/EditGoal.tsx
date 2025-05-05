import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { createGoal, updateGoal, deleteGoal } from '@/api/goal.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Goal } from '@/types/goal.ts';
import './EditGoal.scss';

interface EditGoalProps {
  goalDetails?: Goal;
  handleClose: () => void;
}

const EditGoal: React.FC<EditGoalProps> = ({ goalDetails, handleClose }) => {
  const queryClient = useQueryClient();

  const [goal, setGoal] = useState<Goal>({
    id: goalDetails?.id || null,
    name: goalDetails?.name || '',
    description: goalDetails?.description || '',
    priority: goalDetails?.priority || '',
    startDate: goalDetails?.startDate ? goalDetails.startDate : new Date().toISOString().split('T')[0],
    endDate: goalDetails?.endDate ? goalDetails.endDate : new Date().toISOString().split('T')[0],
    realizationDate: goalDetails?.realizationDate ? goalDetails.realizationDate : null
  });

  const createMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] });
      handleClose();
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] });
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] });
      handleClose();
    }
  });

  const handleGoal = () => {
    if (goal.id != undefined) {
      updateMutation.mutate(goal, goal.id);
    } else {
      console.log('Creating goal:', goal);
      createMutation.mutate(goal);
    }
  };

  const handleDelete = () => {
    if (!goal.id) {
      console.error('No goal ID provided for deletion');
      return;
    }
    deleteMutation.mutate(goal.id);
  };
  return (
    <div className='edit-tag'>
      <div className='edit-tag__content'>
        <div className='edit-tag__content-title'>
          <h2>{goal.id ? 'Edit goal' : 'New goal'}</h2>
        </div>
        <TextField
          id={'name'}
          label={'Name'}
          variant={'outlined'}
          type={'text'}
          value={goal.name || ''}
          onChange={(e) => setGoal({ ...goal, name: e.target.value })}
        ></TextField>
        <TextField
          id={'description'}
          label={'Description'}
          variant={'outlined'}
          type={'text'}
          value={goal.description || ''}
          onChange={(e) => setGoal({ ...goal, description: e.target.value })}
        ></TextField>
        <TextField
          id='priority'
          type='number'
          name='priority'
          label='Priority'
          variant='filled'
          value={goal.priority}
          onChange={(e) => setGoal({ ...goal, priority: e.target.value })}
        />
        <TextField
          id='startDate'
          type='date'
          name='startDate'
          label='Start Date'
          variant='filled'
          value={goal.startDate}
          onChange={(e) => setGoal({ ...goal, startDate: e.target.value })}
        />
        <TextField
          id='endDate'
          type='date'
          name='endDate'
          label='End Date'
          variant='filled'
          value={goal.endDate}
          onChange={(e) => setGoal({ ...goal, endDate: e.target.value })}
        />

        <div className='edit-tag__content--buttons'>
          {goal.id ? (
            <Button variant='contained' size='large' onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <div></div>
          )}
          <Button variant='contained' size='large' onClick={handleGoal}>
            {goal.id ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;
