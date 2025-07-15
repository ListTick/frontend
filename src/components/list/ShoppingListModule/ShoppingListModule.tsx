import React, { useState } from 'react';
import './ShoppingListModule.scss';
import ShoppingListList from '@/components/list/List/ShoppingListList.tsx';
import ItemList from '@/components/list/Item/ItemList.tsx';
import CategoryList from '@/components/list/Category/List/CategoryList.tsx';

const ShoppingListModule: React.FC = () => {
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className='shopping-lists'>
      <section className='shopping-lists__categories'>
        <CategoryList selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}/>
      </section>
      <section className='shopping-lists__content'>
        <section className='shopping-lists__lists'>
          <ShoppingListList selectedCategoryId={selectedCategoryId} onListClick={setSelectedListId} />
        </section>
        <section className='shopping-lists__items'>
          <ItemList shoppingListId={selectedListId} />
        </section>
      </section>
    </div>
  );
};

export default ShoppingListModule;
