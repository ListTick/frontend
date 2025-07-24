import React from 'react';
import { Checkbox, TextField } from '@mui/material';
import { ItemResponse } from '@/types/item.ts';
import './Item.scss'

interface ItemProps {
  item: ItemResponse
  selectedItems: string[]
  handleSelect: (id: string) => void
}

const Item: React.FC<ItemProps> = ({ item, selectedItems, handleSelect }) => {
  return (
    <div className='item'>
      <div className='item__content'>
        <div className='item__content__fields'>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            size='small'
            type='text'
            value={item.name}
            disabled={true}
            sx={{ flex: 1, width: 400 }}
          />
          {item.value && (
            <TextField
              id='value'
              name='value'
              label='Value'
              variant='outlined'
              size='small'
              type='text'
              value={item.value}
              disabled={true}
              sx={{ width: 100 }}
            />
          )}
        </div>
        <Checkbox checked={selectedItems.includes(item.id!)} onChange={() => handleSelect(item.id!)} />
      </div>
    </div>
  );
};

export default Item;