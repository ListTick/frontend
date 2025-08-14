import ListItem from '@mui/material/ListItem';
import { Tag } from '@/types/tag';
import './EditTagCard.scss';
import Modal from '@mui/material/Modal';
import EditTag from '../editTag/EditTag';
import React, { useState } from 'react';

interface EditTagCardProps {
  tag: Tag;
}

const EditTagCard: React.FC<EditTagCardProps> = ({ tag }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(prev => !prev);
  };
  const handleModalClose = () => {
    console.log('Modal closed');
    setIsModalOpen(false);
  };
  return (
    <div className='edit-tag-card' onClick={handleModalOpen}>
      <ListItem key={tag.id} style={{ backgroundColor: tag.color }}>
        <p>{tag.name}</p>
      </ListItem>
      <Modal
        open={isModalOpen}
        onClose={(_, reason) => {
          if (reason === 'escapeKeyDown') {
            handleModalClose();
          }
        }}
        aria-labelledby='modal-tagedit-title'
        aria-describedby='modal-tagedit-description'
      >
        <div  onClick={e => e.stopPropagation()}>
          <EditTag tag={tag} handleClose={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default EditTagCard;
