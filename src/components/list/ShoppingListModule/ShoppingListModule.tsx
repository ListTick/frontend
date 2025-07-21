import React, { useState } from 'react';
import './ShoppingListModule.scss';
import ShoppingListList from '@/components/list/List/ShoppingListList.tsx';
import ItemList from '@/components/list/Item/ItemList.tsx';
import CategoryList from '@/components/list/Category/List/CategoryList.tsx';
import { ShoppingListResponse } from '@/types/shoppingList.ts';

const ShoppingListModule: React.FC = () => {
  const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListResponse | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className='shopping-lists'>
      <section className='shopping-lists__categories'>
        <CategoryList selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}/>
      </section>
      <section className='shopping-lists__content'>
        <section className='shopping-lists__lists'>
          <ShoppingListList selectedCategoryId={selectedCategoryId} onListClick={setSelectedShoppingList} />
        </section>
        <section className='shopping-lists__items'>
          <ItemList shoppingList={selectedShoppingList} />
        </section>
      </section>
    </div>
  );
};

export default ShoppingListModule;
