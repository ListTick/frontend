import React, { useState } from 'react';
import { NoteRequest, NoteResponse } from '@/types/note.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteNote, getAllNotesByAccountId, updateNoteByFields } from '@/api/note.ts';
import { Button, CircularProgress, Snackbar, TextField } from '@mui/material';
import Note from '@/components/note/Note/Note.tsx'
import NewNote from '@/components/note/NewNote/NewNote.tsx';
import './Notes.scss'


const Notes: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<NoteResponse | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => getAllNotesByAccountId()
  });

  const updateMutation = useMutation({
    mutationKey: ['note-update'],
    mutationFn: ({ id, note }: { id: string; note: NoteRequest }) => updateNoteByFields(id, note),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  const deleteMutation = useMutation({
    mutationKey: ['note-delete'],
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
  }

  const handleSelect = (note: NoteResponse) => {
    setSelectedNote(note);
    setDescription(note.description);
  };

  const handleDelete = () => {
    if (selectedNote !== null) {
      deleteMutation.mutate(selectedNote.id);
      setSelectedNote(null);
    } else {
      setErrorMessage('An error occurred while selecting the note.');
    }
  };

  const handleUpdate = () => {
    if (selectedNote !== null) {
      const note: NoteRequest = {
        description: description !== null ? description : ''
      };
      updateMutation.mutate({ id: selectedNote.id, note });
      setOpen(true);
    } else {
      setErrorMessage('An error occurred while selecting the note.');
    }
  };

  return (
    <div className='notes'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message={'The note has been saved successfully.'}
      />
      <div className='notes__sidebar'>
        {data?.map((note) => (
          <div key={note.id} onClick={() => handleSelect(note)}>
            <Note note={note} selectedNote={selectedNote} />
          </div>
        ))}
        <NewNote />
      </div>
      {selectedNote !== null && (
        <div className='notes__content'>
          <div className='notes__content__header'>
            <Button variant='contained' size='small' onClick={handleDelete}>
              Delete
            </Button>
            <h3>{selectedNote.title}</h3>
            <Button variant='contained' size='small' onClick={handleUpdate}>
              Save
            </Button>
          </div>
          <TextField
            label='Description'
            multiline
            rows={20}
            fullWidth
            variant='outlined'
            value={description !== null ? description : ''}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Notes;