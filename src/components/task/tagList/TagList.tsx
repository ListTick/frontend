import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
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
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
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
