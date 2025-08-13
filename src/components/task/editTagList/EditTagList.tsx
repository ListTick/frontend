import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { getTagsByUserId } from '@/api/tag';
import EditTagCard from './editTagCard/EditTagCard';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditTag from './editTag/EditTag';
import { useQuery } from '@tanstack/react-query';
import './EditTagList.scss';

interface EditTagListProps {
  handleCloseTagsEdit: () => void;
}

const EditTagList:React.FC<EditTagListProps> = ({handleCloseTagsEdit}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTagsByUserId()
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
  }

  const handleModalOpen = () => {
    setIsModalOpen(prev => !prev);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (data)
    return (
      <div className='edit-tag-list'>
        <div className='edit-tag-list__content'>
          <div className='edit-tag-list__content--title'>
            <h2>Edit tags</h2>
            {isModalOpen && (
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
                  <EditTag onClose={handleModalClose} />
                </div>
              </Modal>
            )}
          </div>
          <div className='edit-tag-list__content--list'>
            {data.map((tag) => (
              <EditTagCard tag={tag} key={tag.id} />
            ))}
          </div>
          <div className='edit-tag-list__content--buttons'>
          <Button variant='contained' size='medium' onClick={handleCloseTagsEdit}>Close</Button>
          <Button variant='contained' size='medium' onClick={handleModalOpen}>Add Tag</Button>
          </div>
        </div>
      </div>
    );
};

export default EditTagList;
