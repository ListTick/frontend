import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import './NewBucketList.scss';
import { Modal } from '@mui/material';
import { useState } from 'react';
import CreateBucketList from '@/components/list/bucket-list/List/NewList/CreateBucketList.tsx';

const NewBucketList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='newBucketList' onClick={handleOpen}>
      <div className='newBucketList__content'>
        <PlaylistAddIcon />
        <p>Add Bucket List</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <CreateBucketList handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default NewBucketList;
