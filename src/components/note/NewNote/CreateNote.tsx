import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoteRequest } from '@/types/note.ts';
import { createNote } from '@/api/note.ts';
import { Button, Snackbar, TextField } from '@mui/material';

interface CreateNoteProps {
  handleClose: () => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({ handleClose }) => {
  const [title, setTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ['note-create'],
    mutationFn: (note: NoteRequest) => createNote(note),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notes'] });
      handleClose();
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  const create = () => {
    const noteRequest: NoteRequest = {
      title
    };
    createMutation.mutate(noteRequest);
  };

  return (
    <div className='createNote'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />

      <div className='createNote__content'>
        <div className='createNote__content__fields'>
          <TextField
            id='title'
            name='title'
            label='Title'
            variant='outlined'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='createNote__content__buttons'>
          <Button variant='contained' size='small' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' size='small' onClick={create}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;