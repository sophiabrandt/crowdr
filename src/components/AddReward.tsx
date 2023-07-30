'use client';
import { AddRewardModal } from './AddRewardModal';
import { Alert, useAlert } from './Alert';
import { Button } from './Button';
import { useModal } from './Modal';

interface AddRewardProps {
  projectId: string;
}

export const AddReward = ({ projectId }: AddRewardProps) => {
  const { isOpen, setIsOpen } = useModal();
  const { alertDialog, setAlertDialog } = useAlert();

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        intent="text"
        className="text-violet-600"
      >
        + Add New
      </Button>
      {isOpen && (
        <AddRewardModal
          setIsOpen={setIsOpen}
          setAlertDialog={setAlertDialog}
          projectId={projectId}
        />
      )}
      {alertDialog.isOpen && <Alert message={alertDialog.message} />}
    </div>
  );
};
