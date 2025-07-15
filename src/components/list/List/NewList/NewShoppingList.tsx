import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import './NewShoppingList.scss';
import { Modal } from '@mui/material';
import { useState } from 'react';
import CreateShoppingList from '@/components/list/List/NewList/CreateShoppingList.tsx';

const NewShoppingList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='newShoppingList' onClick={handleOpen}>
      <div className='newShoppingList__content'>
        <PlaylistAddIcon />
        <p>Add Shopping List</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <CreateShoppingList handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default NewShoppingList;
