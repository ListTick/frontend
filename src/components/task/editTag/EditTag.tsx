import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { createTag, deleteTag, updateTag } from '@/api/tag.ts';
import { Tag } from '@/types/tag.ts';
import './EditTag.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditTagProps {
  tag?: Tag;
  onClose: () => void;
}
const EditTag: React.FC<EditTagProps> = ({ tag, onClose }) => {
  const queryClient = useQueryClient();
  const id = tag?.id || '';
  const [name, setName] = useState(tag?.name || '');
  const [color, setColor] = useState(tag?.color || '');

  const updateMutation = useMutation({
    mutationFn: () => updateTag({ name, color }, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      onClose();
    }
  });

  const createMutation = useMutation({
    mutationFn: () => createTag({ name, color }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      onClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTag(tag.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      onClose();
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
          <h2>{tag ? 'Edit tag' : 'New tag'}</h2>
        </div>
        <TextField
          id={'name'}
          label={'Name'}
          variant={'outlined'}
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <HexColorPicker color={color} onChange={setColor} />
        <div className='edit-tag__content--buttons'>
          {tag ? (
            <Button variant='contained' size='large' onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <div></div>
          )}
          <Button variant='contained' size='large' onClick={handleTag}>
            {tag ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTag;
