import { Task } from '@/types/task';
import { Button, Checkbox, IconButton, Modal } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './TaskItem.scss';
import TagCard from '../../tagList/tagCard/TagCard';
import React, { useState } from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import EditTask from '../editTask/EditTask';
import { toggleTaskComplete } from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TaskItemProps {
  task: Task;
  onPomodoroClick: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onPomodoroClick }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handlePomodoroClick = () => {
    onPomodoroClick(task);
  };

  const updateMutation = useMutation({
    mutationFn: () => toggleTaskComplete(task.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleTaskComplete = async () => {
    try {
      if (task.id) {
        updateMutation.mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const displayPomodoros = () => {
    if (task.completedPomodoros != null && task.totalPomodoros != null && task.totalPomodoros > 0) {
      return (
        <Button onClick={handlePomodoroClick}>
          <div className='pomodoros-count'>
            <h3>
              {task.completedPomodoros}/{task.totalPomodoros}
            </h3>
            <TimerIcon />
          </div>
        </Button>
      );
    }
  };

  return (
    <div className='taskItem'>
      <div className='taskItem__title'>
        <h3>{task.name}</h3>
        <p>{task.dueDate}</p>
      </div>
      <div className='taskItem__tags'>
        <TagCard tag={task.tag} />
      </div>
      <div className='taskItem__icons'>
        {displayPomodoros()}
        <IconButton onClick={handleTaskComplete}>
          <Checkbox checked={task.isCompleted} color='success' />
        </IconButton>
        <IconButton onClick={handleModalOpen}>
          <MoreVertIcon fontSize='medium' color='success' />
        </IconButton>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={(_, reason) => {
            if (reason === 'escapeKeyDown') {
              handleModalClose();
            }
          }}
          aria-labelledby='modal-taskedit-title'
          aria-describedby='modal-taskedit-description'
        >
          <div>
            <EditTask taskDetails={task} handleClose={handleModalClose} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskItem;
