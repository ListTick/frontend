import React, { useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Modal } from '@mui/material';
import CreateCategory from '@/components/list/shopping-list/Category/NewCategory/CreateCategory.tsx';
import './NewCategory.scss'


const NewCategory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='newCategory' onClick={handleOpen}>
      <div className='newCategory__content'>
        <PlaylistAddIcon />
        <p>Add Category</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-shopping-list-new-category-title'
        aria-describedby='modal-shopping-list-new-category-description'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <CreateCategory handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default NewCategory;