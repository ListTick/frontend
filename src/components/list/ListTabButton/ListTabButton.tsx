import React from 'react';
import './ListTabButton.scss';

interface ListTabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ListTabButton: React.FC<ListTabButtonProps> = ({ active, onClick, children }) => (
  <div className='listsTab__content'>
    <button className={`header-btn${active ? ' active' : ''}`} onClick={onClick} type='button'>
      {children}
    </button>
  </div>
);

export default ListTabButton;