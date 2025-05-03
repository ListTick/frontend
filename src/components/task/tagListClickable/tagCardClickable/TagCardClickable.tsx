import React from 'react';
import ListItem from '@mui/material/ListItem';
import { Tag } from '@/types/tag';
import './TagCardClickable.scss';

interface TagCardProps {
  tag: Tag;
  onTagClick: (tag: Tag) => void;
  isSelected: boolean;
}

const TagCardClickable: React.FC<TagCardProps> = ({ tag, onTagClick, isSelected }) => {
  const handleClick = () => {
    if (tag) {
      onTagClick(tag);
    }
  };
  console.log(isSelected);
  return (
    <ListItem
      className={`tagCardClickable${isSelected ? '--selected' : ''}`}
      key={tag.id}
      style={{ backgroundColor: tag.color }}
      onClick={handleClick}
    >
      <p>{tag.name}</p>
    </ListItem>
  );
};

export default TagCardClickable;
