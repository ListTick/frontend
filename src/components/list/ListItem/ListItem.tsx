import React, { useState } from 'react';
import './ListItem.scss';
import { ShoppingListResponse } from '@/types/shoppingList.ts';
import { IconButton, Modal } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingListInfo from '@/components/list/List/ListInfo/ShoppingListInfo.tsx';
import Category from './../Category/Category.tsx'

interface ListItemProps {
  shoppingList: ShoppingListResponse;
}

const ListItem: React.FC<ListItemProps> = ({ shoppingList }) => {
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
        <h3>{shoppingList.name}</h3>
      </div>
      <div className='listItem__icons'>
        {shoppingList.shared && (
          <div className='listItem__icons--shared'>
            <GroupIcon style={{ verticalAlign: 'middle' }} />
          </div>
        )}
        {shoppingList.category && (
          <div className='listItem__icons--category'>
            <Category category={shoppingList.category} />
          </div>
        )}
        <IconButton onClick={handleOpen}>
          <MoreVertIcon fontSize='medium' color='success' />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-shopping-list-info-title'
        aria-describedby='modal-shopping-list-info-description'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <ShoppingListInfo shoppingList={shoppingList} handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default ListItem;