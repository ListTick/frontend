import {
  Button,
  CircularProgress,
  Modal
} from '@mui/material';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useQuery } from '@tanstack/react-query';
import './ItemList.scss';
import { getAllItemsByShoppingListId } from '@/api/shoppingListItem.ts';
import NewItem from '@/components/list/shopping-list/Item/NewItem/NewItem.tsx';
import Item from '@/components/list/shopping-list/Item/Item/Item.tsx';
import DeleteItem from '@/components/list/shopping-list/Item/DeleteItem/DeleteItem.tsx';
import { ShoppingListResponse } from '@/types/shoppingList.ts';


interface ItemListProps {
  shoppingList: ShoppingListResponse | null
}

const ItemList: React.FC<ItemListProps> = ({ shoppingList }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['shopping-list-items', shoppingList?.id],
    queryFn: () => (shoppingList ? getAllItemsByShoppingListId(shoppingList.id) : Promise.resolve([])),
    enabled: !!shoppingList
  });

  const handleSelect = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
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
    <div className='itemList'>
      <div className='itemList__content'>
        {shoppingList ? (
          <>
            <div className='itemList__content__manage'>
              <h3>{shoppingList.name}</h3>
              {selectedItems.length !== 0 && (
                <Button variant='contained' onClick={handleOpen}>
                  Delete Selected
                </Button>
              )}
            </div>
            {data &&
              data.length > 0 &&
              data.map((item) => <Item item={item} selectedItems={selectedItems} handleSelect={handleSelect} />)}
            <NewItem shoppingList={shoppingList} />

            <Modal open={open} onClose={handleClose} onClick={(e) => e.stopPropagation()}>
              <div onClick={(e) => e.stopPropagation()}>
                <DeleteItem
                  selectedItems={selectedItems}
                  clearSelectedItems={clearSelectedItems}
                  shoppingList={shoppingList}
                  handleClose={handleClose}
                />
              </div>
            </Modal>
          </>
        ) : (
          <div className='itemList__content__manage'>
            <h3>Select the shopping list</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;