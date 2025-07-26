import React, { useState } from 'react';
import './BucketListModule.scss';
import BucketListList from '@/components/list/bucket-list/List/BucketListList.tsx';
import ItemList from '@/components/list/bucket-list/Item/ItemList.tsx';
import CategoryList from '@/components/list/bucket-list/Category/List/CategoryList.tsx';
import { BucketListResponse } from '@/types/bucketList.ts';

const BucketListModule: React.FC = () => {
  const [selectedBucketList, setSelectedBucketList] = useState<BucketListResponse | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className='bucket-lists'>
      <section className='bucket-lists__categories'>
        <CategoryList selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}/>
      </section>
      <section className='bucket-lists__content'>
        <section className='bucket-lists__lists'>
          <BucketListList selectedCategoryId={selectedCategoryId} onListClick={setSelectedBucketList} />
        </section>
        <section className='bucket-lists__items'>
          <ItemList bucketList={selectedBucketList} />
        </section>
      </section>
    </div>
  );
};

export default BucketListModule;