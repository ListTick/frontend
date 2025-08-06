import ListItem from '@mui/material/ListItem';
import { Tag } from '@/types/tag';
import './TagCard.scss';

const TagCard = ({ tag }: { tag: Tag }) => {
  if (!tag) {
    return null;
  }
  return (
    <ListItem className='tagCard' key={tag.id} style={{ backgroundColor: tag.color }}>
    </ListItem>
  );
};

export default TagCard;
