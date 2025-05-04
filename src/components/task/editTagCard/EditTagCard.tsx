import ListItem from '@mui/material/ListItem';
import { Tag } from '@/types/tag.ts';
import './EditTagCard.scss';
import Modal from '@mui/material/Modal';
import EditTag from '@/components/task/editTag/EditTag.tsx';
import { useState } from 'react';

interface EditTagCardProps {
  tag: Tag;
}

const EditTagCard: React.FC<EditTagCardProps> = ({ tag }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
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
        <div>
          <EditTag tag={tag} onClose={handleModalClose} />
        </div>
      </Modal>
    </div>
  );
};

export default EditTagCard;
