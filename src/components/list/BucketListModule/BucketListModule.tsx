import React from 'react';
import './BucketListModule.scss';

const BucketListModule: React.FC = () => {
  return (
    <div className="bucket-list">
      <h2>Bucket List</h2>
      <ul>
        <li>Visit Paris</li>
        <li>Learn to surf</li>
        <li>Write a book</li>
      </ul>
    </div>
  );
};

export default BucketListModule;