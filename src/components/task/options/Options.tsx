import React, { useState } from 'react';
import { IconButton, Popover, Button, Modal } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Options.scss';
import EditTagList from '../editTagList/EditTagList';
import { deleteAllCompletedTasks } from '@/api/task';
import { useQueryClient } from '@tanstack/react-query';

interface OptionsProps {
  toggleShowArchivedTasks: () => void;
  isArchivedTasksDisplayed: boolean;
}

const Options: React.FC<OptionsProps> = ({ toggleShowArchivedTasks, isArchivedTasksDisplayed }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isTagsEditOpen, setIsTagsEditOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = (): void => {
    setAnchorEl(null);
    setIsPopoverOpen(false);
  };

  const handleOpenTagsEdit = (): void => {
    setIsTagsEditOpen(true);
  };

  const handleCloseTagsEdit = (): void => {
    setIsTagsEditOpen(false);
  };

  const handleDeleteCompletedTasks = async (): Promise<void> => {
    await deleteAllCompletedTasks();
    void queryClient.invalidateQueries({ queryKey: ['tasks'] });
    handleClosePopover();
  };

  const handleShowArchivedTasks = (): void => {
    toggleShowArchivedTasks();
    handleClosePopover();
  };

  return (
    <div className='options'>
      <div className='options__button'>
        <IconButton onClick={handleOpenPopover}>
          <MoreVertIcon fontSize='medium' color='success' />
        </IconButton>
      </div>
      <Popover
        open={isPopoverOpen}
        onClose={handleClosePopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className='options__popover'>
          <Button onClick={handleShowArchivedTasks}>{isArchivedTasksDisplayed ? 'Show tasks' : 'Show archives'}</Button>
          <Button onClick={handleDeleteCompletedTasks}>Clear done</Button>
          <Button onClick={handleOpenTagsEdit}>Edit tags</Button>
        </div>
      </Popover>
      <Modal
        open={isTagsEditOpen}
        onClose={(_, reason) => {
          if (reason === 'escapeKeyDown') {
            handleCloseTagsEdit();
          }
        }}
        aria-labelledby='modal-taskedit-title'
        aria-describedby='modal-taskedit-description'
      >
        <div>
          <EditTagList />
        </div>
      </Modal>
    </div>
  );
};

export default Options;
