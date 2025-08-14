import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { createTag, deleteTag, updateTag } from '@/api/tag';
import { Tag } from '@/types/tag';
import './EditTag.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditTagProps {
  tag?: Tag;
  handleClose: () => void;
}
const EditTag: React.FC<EditTagProps> = ({ tag, handleClose }) => {
  const queryClient = useQueryClient();
  const id = tag?.id || '';
  const [name, setName] = useState(tag?.name || '');
  const [color, setColor] = useState(tag?.color || '#494d50');

  const updateMutation = useMutation({
    mutationFn: () => updateTag({ name, color }, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tags'] });
      handleClose();
    }
  });

  const createMutation = useMutation({
    mutationFn: () => createTag({ name, color }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tags'] });
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (tag?.id) {
        return deleteTag(tag.id);
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tags'] });
      handleClose();
    }
  });

  const handleTag = () => {
    if (tag != null) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className='edit-tag'>
      <div className='edit-tag__content'>
        <div className='edit-tag__content-title'>
          <h3>{tag ? 'Edit tag' : 'Create Tag'}</h3>
          <TextField
            id={'name'}
            label={'Name'}
            variant={'outlined'}
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          ></TextField>
        </div>

        <HexColorPicker color={color} onChange={setColor} />
        <div className='edit-tag__content--buttons'>
          {tag ? (
            <div className='edit-tag__content--buttons-delete'>
            <Button variant='contained' size='small' onClick={handleDelete}>
              Delete
            </Button>
            </div>
          ) : (
            <div></div>
          )}
          <div className='edit-tag__content--buttons-edit'>
          <Button variant='contained' size='small' onClick={handleClose}>
            Cancel
          </Button>

          <Button variant='contained' size='small' onClick={handleTag}>
            {tag ? 'Update' : 'Create'}
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTag;
