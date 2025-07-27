import React, { useState } from 'react';
import './ListItem.scss';
import { BucketListResponse } from '@/types/bucketList.ts';
import { IconButton, Modal } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupIcon from '@mui/icons-material/Group';
import BucketListInfo from '@/components/list/bucket-list/List/ListInfo/BucketListInfo.tsx';
import Category from '../Category/Category.tsx'

interface ListItemProps {
  bucketList: BucketListResponse;
}

const ListItem: React.FC<ListItemProps> = ({ bucketList }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='listItem'>
      <div className='listItem__title'>
        <h3>{bucketList.name}</h3>
      </div>
      <div className='listItem__icons'>
        {bucketList.shared && (
          <div className='listItem__icons--shared'>
            <GroupIcon style={{ verticalAlign: 'middle' }} />
          </div>
        )}
        {bucketList.category && (
          <div className='listItem__icons--category'>
            <Category category={bucketList.category} />
          </div>
        )}
        <IconButton onClick={handleOpen}>
          <MoreVertIcon fontSize='medium' color='success' />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-bucket-list-info-title'
        aria-describedby='modal-bucket-list-info-description'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <BucketListInfo bucketList={bucketList} handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default ListItem;