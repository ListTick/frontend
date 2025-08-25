import React, { useState } from 'react';
import { IconButton, Modal } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Goal } from '@/types/goal';
import EditGoal from '../editGoal/EditGoal';
import './GoalItem.scss';

export interface GoalItemProps {
  goal: Goal;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const renderStars = () => {
    if (!goal.priority || goal.priority <= 0) return null;
    return '⭐'.repeat(goal.priority);
  };

  return (
    <div className="goalItem">
      <div className="goalItem__main">
        <div className="goalItem__main--title">
          <h3>{goal.name}</h3>
          <div className="goalItem__icons">
            <IconButton onClick={handleModalOpen}>
              <MoreVertIcon fontSize="medium" color="success" />
            </IconButton>
          </div>
        </div>
        <div className="goalItem__main--content">
          {goal.description && (
            <div className="goalItem__description">
              <p style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                maxWidth: '95%',
              }}>{goal.description}</p>
            </div>
          )}
        </div>
        <div className="goalItem__main--priority-dates">
        {goal.priority != null && (
          <p>
            Priority: {renderStars()}
          </p>
        )}
        <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
        {goal.realizationDate && (
          <p>Realization Date: {new Date(goal.realizationDate).toLocaleDateString()}</p>
        )}
      </div>
    </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={(_, reason) => {
            if (reason === 'escapeKeyDown') {
              handleModalClose();
            }
          }}
          aria-labelledby="modal-goaledit-title"
          aria-describedby="modal-goaledit-description"
        >
          <div>
            <EditGoal goalDetails={goal} handleClose={handleModalClose} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GoalItem;
