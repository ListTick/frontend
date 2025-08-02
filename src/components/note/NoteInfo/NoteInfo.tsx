import React from 'react';
import { NoteResponse } from '@/types/note.ts';
import { Button, TextField } from '@mui/material';

interface NoteInfoProps {
  note: NoteResponse
  handleClose: () => void
}

const NoteInfo: React.FC<NoteInfoProps> = ({ note, handleClose }) => {
  return (
    <div className='noteInfo'>
      <div className='noteInfo__content'>
        <h3>Note Details</h3>
        <TextField
          id='title'
          name='title'
          label='Title'
          variant='outlined'
          type='text'
          value={note.title}
          disabled={true}
        />
        <TextField
          id='createdAt'
          name='createdAt'
          label='Created At'
          variant='outlined'
          type='text'
          value={note.createdAt}
          disabled={true}
        />
        <TextField
          id='modifiedAt'
          name='modifiedAt'
          label='Modified At'
          variant='outlined'
          type='text'
          value={note.modifiedAt}
          disabled={true}
        />
      </div>
      <Button variant='contained' size='small' onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
};

export default NoteInfo;