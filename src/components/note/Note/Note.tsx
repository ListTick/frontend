import React, { useState } from 'react';
import { NoteResponse } from '@/types/note.ts';
import { IconButton, Modal } from '@mui/material';
import NoteInfo from '@/components/note/NoteInfo/NoteInfo.tsx';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Note.scss';

interface NoteProps {
  note: NoteResponse;
  selectedNote: NoteResponse | null;
}

const Note: React.FC<NoteProps> = ({ note, selectedNote }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='note'>
      <div className='note__title'>
        <h3>{note.title.length > 20 ? note.title.slice(0, 17) + '…' : note.title}</h3>
      </div>
      <div className='note__icon'>
        <IconButton onClick={handleOpen}>
          <MoreVertIcon fontSize='medium' color='success' />
        </IconButton>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-note-info' onClick={(e) => e.stopPropagation()}>
        <div onClick={(e) => e.stopPropagation()}>
          {selectedNote && <NoteInfo note={selectedNote} handleClose={handleClose} />}
        </div>
      </Modal>
    </div>
  );
};

export default Note;
