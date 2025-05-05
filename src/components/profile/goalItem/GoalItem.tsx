import React from 'react';
import { Goal } from '@/types/goal.ts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './GoalItem.scss';

interface GoalItemProps {
  goal: Goal;
}

const displayStars = (priority: number) => {
  const stars = [];
  for (let i = 0; i < priority; i++) {
    stars.push(<span key={i}>⭐</span>);
  }
  return stars;
};

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
  return (
    <div className='goalItem'>
      <div className='goalItem__title'>
        <h3>{goal.name}</h3>
        <div>
          <MoreVertIcon />
        </div>
      </div>
      <div className='goalItem__description'>
        <span>{goal.description}</span>
      </div>
      <div className='goalItem__dates'>
        <div>
          <b>Start: </b>
          <span>
            {new Date(goal.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <div>
          <b>End: </b>
          <span>
            {new Date(goal.endDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
      <div className='goalItem__priority'>
        <b>Priority: </b>
        {displayStars(goal.priority)}
      </div>
    </div>
  );
};
export default GoalItem;
