import { ShoppingListCategoryResponse } from '@/types/shoppingListCategory.ts';
import ListItem from '@mui/material/ListItem';


const Category = ({ category }: { category: ShoppingListCategoryResponse}) => {
  return (
    <ListItem className='category' key={category.id} style={{
      backgroundColor: category.colour,
      borderRadius: '10px' }}>
    </ListItem>
  );
}

export default Category;