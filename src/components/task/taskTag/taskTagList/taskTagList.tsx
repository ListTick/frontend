import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import { getTagsByUserId } from '../../../api/tag';
import { Tag } from '../../../types/entities/Tag';
import Snackbar from '../../alert/Alert';
import TagCardClickable from '../../tagListClickable/tagCardClickable/TagCardClickable';
import { useState } from 'react';
import './TaskTagList.scss';

interface TaskTagProps {
  alreadySelectedTags: Tag[];
  onSelectedTagsChange: (selectedTags: Tag[]) => void;
}

const TaskTagList: React.FC<TaskTagProps> = ({
  alreadySelectedTags,
  onSelectedTagsChange,
}) => {
  const { data, isLoading, isError } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTagsByUserId,
  });
  const [selectedTags, setSelectedTags] = useState<Tag[]>(alreadySelectedTags);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return (
      <Snackbar severity="error">
        Oops there was an error, please contact our IT department
      </Snackbar>
    );
  }

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = prevSelectedTags.some((t) => t.id === tag.id)
        ? prevSelectedTags.filter((t) => t.id !== tag.id)
        : [...prevSelectedTags, tag];
      onSelectedTagsChange(newSelectedTags);
      return newSelectedTags;
    });
  };

  const filteredData = data.filter(
    (tag) =>
      !alreadySelectedTags.some((selectedTag) => selectedTag.id === tag.id)
  );

  return (
    <div className="taskTagList">
      {alreadySelectedTags.map((selectedTag) => (
        <TagCardClickable
          key={selectedTag.id}
          tag={selectedTag}
          onTagClick={handleTagClick}
          isSelected={selectedTags.includes(selectedTag)}
        />
      ))}
      {filteredData.map((tag) => {
        return (
          <TagCardClickable
            key={tag.id}
            tag={tag}
            onTagClick={handleTagClick}
            isSelected={selectedTags.includes(tag)}
          />
        );
      })}
    </div>
  );
};

export default TaskTagList;
