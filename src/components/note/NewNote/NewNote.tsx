import React, { useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Modal } from '@mui/material';
import CreateNote from '@/components/note/NewNote/CreateNote.tsx';


const NewNote: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='newNote' onClick={handleOpen}>
      <div className='newNote__content'>
        <PlaylistAddIcon />
        <p>Add Note</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-create-note-title'
        aria-describedby='modal-create-note-description'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <CreateNote handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default NewNote;