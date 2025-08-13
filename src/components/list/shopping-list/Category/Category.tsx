import { BucketListCategoryResponse } from '@/types/bucketListCategory.ts';
import ListItem from '@mui/material/ListItem';


const Category = ({ category }: { category: BucketListCategoryResponse}) => {
  return (
    <ListItem className='category' key={category.id} style={{
      backgroundColor: category.colour,
      borderRadius: '10px' }}>
    </ListItem>
  );
}

export default Category;