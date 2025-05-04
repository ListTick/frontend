import { Button, Modal } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGoal } from '@/api/goal.ts';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditGoal from '@/components/profile/editGoal/EditGoal.tsx';

const AddGoal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] });
    }
  });

  return (
    <div className='add-new-goal' onClick={handleOpen}>
      <AddIcon />
      <Button>Add Goal</Button>
      <Modal
        open={open}
        onClose={(_event, reason) => {
          if (reason === 'escapeKeyDown') {
            handleClose();
          }
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <EditGoal handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};
export default AddGoal;
