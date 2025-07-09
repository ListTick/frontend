import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '../alert/Alert';
import TagCard from './tagCard/TagCard';
import { useQuery } from '@tanstack/react-query';
import { getTagsByUserId } from '@/api/tag';
import './TagList.scss';
import { Tag } from '@/types/tag';

const TagList = () => {
  const { data, isLoading, isError } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTagsByUserId
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  return (
    <div className='tagList'>
      {data.map((tag) => {
        return <TagCard key={tag.id} tag={tag} />;
      })}
    </div>
  );
};

export default TagList;
