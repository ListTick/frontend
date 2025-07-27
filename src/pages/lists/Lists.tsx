import { useState } from 'react';
import ListTabButton from '@/components/list/shopping-list/ListTabButton/ListTabButton';
import ShoppingListModule from '@/components/list/shopping-list/ShoppingListModule/ShoppingListModule.tsx';
import BucketListModule from '@/components/list/bucket-list/BucketListModule/BucketListModule.tsx';
import './Lists.scss';

const Lists = () => {
  const [activeTab, setActiveTab] = useState<'shopping' | 'bucket'>('shopping');

  return (
    <div className="lists">
      <header className="lists__header">
        <ListTabButton
          active={activeTab === 'shopping'}
          onClick={() => setActiveTab('shopping')}
        >
          Shopping Lists
        </ListTabButton>
        <ListTabButton
          active={activeTab === 'bucket'}
          onClick={() => setActiveTab('bucket')}
        >
          Bucket Lists
        </ListTabButton>
      </header>
      <section className="lists__content">
        {activeTab === 'shopping' && <ShoppingListModule />}
        {activeTab === 'bucket' && <BucketListModule />}
      </section>
    </div>
  );
};

export default Lists;