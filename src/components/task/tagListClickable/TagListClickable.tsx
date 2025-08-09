import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Tag } from '@/types/tag';
import { getTagsByUserId } from '@/api/tag';
import TagCardClickable from './tagCardClickable/TagCardClickable';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import './TagListClickable.scss';

interface TagListClickableProps {
  handleTagClick: (tag: Tag) => void;
  selectedTagId: string | null;
}

const TagListClickable: React.FC<TagListClickableProps> = ({ handleTagClick, selectedTagId }) => {
  const { data, isLoading, isError } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTagsByUserId
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

  if (data)
    return (
      <div className='tagListClickable'>
        {data.map((tag) => {
          return (
            <TagCardClickable
              key={tag.id}
              tag={tag}
              onTagClick={handleTagClick}
              isSelected={selectedTagId === tag.id}
            />
          );
        })}
      </div>
    );
};

export default TagListClickable;
