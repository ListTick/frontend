import React from 'react';
import './ShoppingListModule.scss';
import { Tag } from '@/types/tag.ts';
import TagListClickable from '@/components/task/tagListClickable/TagListClickable.tsx';
import ListList from '@/components/list/List/ListList.tsx';

const ShoppingListModule: React.FC = () => {
  return (
    <div className="shopping-lists">
      <section className="shopping-lists__categories">
        <TagListClickable handleTagClick={function(tag: Tag): void {
          throw new Error('Function not implemented: ' + tag);
        } } />
      </section>
      <section className="shopping-lists__content">
        <section className="shopping-lists__lists">
          <ListList />
        </section>
        <section className="shopping-lists__items">

        </section>
      </section>
    </div>
  );
};

export default ShoppingListModule;