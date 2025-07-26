import {
  Button,
  CircularProgress,
  Modal
} from '@mui/material';
import React, { useState } from 'react';
import Snackbar from '../../../task/alert/Alert.tsx';
import { useQuery } from '@tanstack/react-query';
import './ItemList.scss';
import { getAllItemsByBucketListId } from '@/api/bucketListItem.ts';
import NewItem from '@/components/list/bucket-list/Item/NewItem/NewItem.tsx';
import Item from '@/components/list/bucket-list/Item/Item/Item.tsx';
import DeleteItem from '@/components/list/bucket-list/Item/DeleteItem/DeleteItem.tsx';
import { BucketListResponse } from '@/types/bucketList.ts';


interface ItemListProps {
  bucketList: BucketListResponse | null
}

const ItemList: React.FC<ItemListProps> = ({ bucketList }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['bucket-list-items', bucketList?.id],
    queryFn: () => (bucketList ? getAllItemsByBucketListId(bucketList.id) : Promise.resolve([])),
    enabled: !!bucketList
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
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  return (
    <div className='itemList'>
      <div className='itemList__content'>
        {bucketList ? (
          <>
            <div className='itemList__content__manage'>
              <h3>{bucketList.name}</h3>
              {selectedItems.length !== 0 && (
                <Button variant='contained' onClick={handleOpen}>
                  Delete Selected
                </Button>
              )}
            </div>
            {data &&
              data.length > 0 &&
              data.map((item) => <Item item={item} selectedItems={selectedItems} handleSelect={handleSelect} />)}
            <NewItem bucketList={bucketList} />

            <Modal open={open} onClose={handleClose} onClick={(e) => e.stopPropagation()}>
              <div onClick={(e) => e.stopPropagation()}>
                <DeleteItem
                  selectedItems={selectedItems}
                  clearSelectedItems={clearSelectedItems}
                  bucketList={bucketList}
                  handleClose={handleClose}
                />
              </div>
            </Modal>
          </>
        ) : (
          <div className='itemList__content__manage'>
            <h3>Select the bucket list</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;