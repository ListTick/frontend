import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '../alert/Alert';
import { Tag } from '@/types/tag';
import { getTagsByUserId } from '@/api/tag';
import TagCardClickable from './tagCardFilterable/TagCardFilterable';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTasksByUserId } from '@/api/task';
import './TagListClickable.scss';

const TagListClickable = () => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTagsByUserId
  });

  useEffect(() => {
    void queryClient.invalidateQueries({
      queryKey: ['tasks']
    });
  }, [selectedTag]);

  // const { refetch: refetchTasks } = useQuery({
  //   queryKey: ['tasks'],
  //   queryFn: () => getTasksByUserId(selectedTag),
  //   enabled: selectedTag?.name !== null
  // });
  //
  // useEffect(() => {
  //   void refetchTasks();
  // }, [selectedTag, refetchTasks]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  const handleTagClick = (tag: Tag) => {
    if (selectedTag?.name === tag.name) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  if (data)
    return (
      <div className='tagListClickable'>
        {data.map((tag) => {
          return (
            <TagCardClickable
              key={tag.id}
              tag={tag}
              onTagClick={handleTagClick}
              isSelected={selectedTag?.id === tag.id}
            />
          );
        })}
      </div>
    );
};

export default TagListClickable;
