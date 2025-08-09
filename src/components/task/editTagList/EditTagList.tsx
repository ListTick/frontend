import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { getTagsByUserId } from '@/api/tag';
import EditTagCard from './editTagCard/EditTagCard';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditTag from './editTag/EditTag';
import { useQuery } from '@tanstack/react-query';
import './EditTagList.scss';

const EditTagList = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTagsByUserId()
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
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
    setIsModalOpen(true);
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
            <Button onClick={handleModalOpen}>Add Tag</Button>
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
        </div>
      </div>
    );
};

export default EditTagList;
