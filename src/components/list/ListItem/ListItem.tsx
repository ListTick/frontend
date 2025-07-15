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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='listItem'>
      <div className='listItem__title'>
        <h3>{shoppingList.name}</h3>
      </div>
      <div className='listItem__icons'>
        {shoppingList.shared && <div className='listItem__icons--shared'>
          <GroupIcon style={{ verticalAlign: 'middle' }}/>
        </div>}
        {shoppingList.category && <div className='listItem__icons--category'>
          <Category category={shoppingList.category} />
        </div>}
        <IconButton onClick={handleModalOpen}>
          <MoreVertIcon fontSize='medium' color='success' />
        </IconButton>
      </div>
      <div className='listItem__modal'>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onClose={(_, reason) => {
              if (reason === 'escapeKeyDown') {
                handleModalClose();
              }
            }}
            aria-labelledby='modal-shoppingListEdit-title'
            aria-describedby='modal-shoppingListEdit-description'
          >
            <div>
              <ShoppingListInfo shoppingList={shoppingList} handleClose={handleModalClose} />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ListItem;