import { Button, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGoal, deleteGoal, updateGoal } from '@/api/goal';
import { Goal } from '@/types/goal.ts';

interface EditGoalProps {
  goalDetails?: Goal;
  handleClose: () => void;
}

const toInputDate = (d?: Date) =>
  d ? new Date(d).toISOString().slice(0, 10) : '';

const fromInputDate = (v: string): Date | undefined =>
  v ? new Date(v + 'T00:00:00') : undefined;

type GoalForm = {
  id?: string;
  name: string;
  description?: string;
  priority?: number | '';
  startDate: string;
  endDate: string;
  realizationDate?: string;
};

const EditGoal: React.FC<EditGoalProps> = ({ goalDetails, handleClose}) => {
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState<GoalForm>({
    id: goalDetails?.id,
    name: goalDetails?.name ?? '',
    description: goalDetails?.description ?? '',
    priority: goalDetails?.priority ?? '',
    startDate: toInputDate(goalDetails?.startDate) ?? '',
    endDate: toInputDate(goalDetails?.endDate) ?? '',
    realizationDate: toInputDate(goalDetails?.realizationDate)
  });

  const handleChange =
    (name: keyof GoalForm) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (name === 'priority') {
          setForm(prev => ({ ...prev, priority: value === '' ? '' : Number(value) }));
        } else {
          setForm(prev => ({ ...prev, [name]: value }));
        }
      };

  const buildPayload = (): Goal => {
    return {
      id: form.id,
      name: form.name.trim(),
      description: form.description?.trim() || undefined,
      priority: form.priority === '' ? undefined : Number(form.priority),
      startDate: fromInputDate(form.startDate)!,
      endDate: fromInputDate(form.endDate)!,
      realizationDate: fromInputDate(form.realizationDate || '')
    };
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
    mutationFn: () => createGoal(buildPayload()),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] });
      handleClose();
    },
    onError: onGenericError
  });

  const updateMutation = useMutation({
    mutationFn: () => updateGoal(buildPayload(), form.id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] });
      handleClose();
    },
    onError: onGenericError
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteGoal(form.id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] });
      handleClose();
    },
    onError: onGenericError
  });

  const handleSave = () => {
    if (!form.name.trim()) {
      setErrorMessage('Name is required.');
      return;
    }
    if (!form.startDate || !form.endDate) {
      setErrorMessage('Start and end dates are required.');
      return;
    }
    if (form.id) {
      updateMutation.mutate();
    } else {
      postMutation.mutate();
    }
  };

  const handleDelete = () => {
    if (form.id) deleteMutation.mutate();
  };

  return (
    <div className='add-new-task'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2500}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <div className='add-new-task__content'>
        <h2>{form.id ? 'Edit Goal' : 'New Goal'}</h2>

        <TextField
          id='name'
          name='name'
          label='Name'
          variant='outlined'
          type='text'
          value={form.name}
          onChange={handleChange('name')}
          fullWidth
        />

        <TextField
          id='description'
          name='description'
          label='Description'
          variant='outlined'
          type='text'
          value={form.description}
          onChange={handleChange('description')}
          multiline
          rows={8}
          maxRows={15}
          fullWidth
          sx={{ marginTop: 2 }}
        />

        <TextField
          id='priority'
          name='priority'
          label='Priority'
          variant='filled'
          type='number'
          value={form.priority}
          onChange={handleChange('priority')}
          sx={{ marginTop: 2 }}
        />

        <h2 style={{ marginTop: 16 }}>Dates</h2>
        <div className='add-new-task__content--pomodoro-duration'>
          <TextField
            id='startDate'
            name='startDate'
            type='date'
            label='Start Date'
            variant='filled'
            value={form.startDate}
            onChange={handleChange('startDate')}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id='endDate'
            name='endDate'
            type='date'
            label='End Date'
            variant='filled'
            value={form.endDate}
            onChange={handleChange('endDate')}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className='add-new-task__content--pomodoro-quantity'>
          <TextField
            id='realizationDate'
            name='realizationDate'
            type='date'
            label='Realization Date (optional)'
            variant='filled'
            value={form.realizationDate || ''}
            onChange={handleChange('realizationDate')}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className='add-new-task__content--buttons' style={{ marginTop: 16 }}>
          {form.id ? (
            <Button variant='contained' size='medium' color='error' onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <div />
          )}
          <div className='add-new-task__content--buttons_right'>
            <Button variant='contained' size='medium' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' size='medium' onClick={handleSave}>
              {form.id ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;
