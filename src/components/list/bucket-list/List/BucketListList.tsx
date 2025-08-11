import { CircularProgress } from '@mui/material';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useQuery } from '@tanstack/react-query';
import './BucketListList.scss';
import { getAllBucketListsByAccountId } from '@/api/bucketList.ts';
import ListItem from '@/components/list/bucket-list/ListItem/ListItem.tsx';
import NewBucketList from '@/components/list/bucket-list/List/NewList/NewBucketList.tsx';
import { BucketListResponse } from '@/types/bucketList.ts';

interface BucketListListProps {
  selectedCategoryId: string | null;
  onListClick: (bucketList: BucketListResponse) => void;
}

const BucketListList: React.FC<BucketListListProps> = ({ selectedCategoryId, onListClick }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['bucket-lists'],
    queryFn: () => getAllBucketListsByAccountId()
  });

  const filteredLists = data
    ? selectedCategoryId
      ? data.filter((list) => list.category.id === selectedCategoryId)
      : data
    : [];

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
    <div className='bucketListList'>
      {filteredLists.map((bucketList) => (
        <div key={bucketList.id} onClick={() => onListClick(bucketList)}>
          <ListItem bucketList={bucketList} />
        </div>
      ))}
      <NewBucketList />
    </div>
  );
};

export default BucketListList;
