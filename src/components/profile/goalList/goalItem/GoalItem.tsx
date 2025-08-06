import { Goal } from '@/types/goal.ts';
import React from 'react';
import './GoalItem.scss';

export interface GoalItemProps {
  goal: Goal;
}

const GoalItem:React.FC<GoalItemProps> = ({goal}) => {
  return (
    <div className='goalItem'>
      <h3>{goal.name}</h3>
      <p>{goal.description}</p>
      <p>Priority: {goal.priority}</p>
      <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
      {goal.realizationDate && (
        <p>Realization Date: {new Date(goal.realizationDate).toLocaleDateString()}</p>
      )}
    </div>
  );
};
export default GoalItem;
