import React, { useState } from 'react';
import { NoteResponse } from '@/types/note.ts';
import { IconButton, Modal } from '@mui/material';
import NoteInfo from '@/components/note/NoteInfo/NoteInfo.tsx';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface NoteProps {
  note: NoteResponse
  selectedNote: NoteResponse | null
}

const Note: React.FC<NoteProps> = ({ note, selectedNote }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='note'>
      <div className='note__content'>
        <h3>{note.title}</h3>
        <IconButton onClick={handleOpen}>
          <MoreVertIcon fontSize='medium' color='success' />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-note-info'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <NoteInfo note={selectedNote} handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default Note;