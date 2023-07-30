import { FormEvent, useCallback, useState } from 'react';
import { Modal } from './Modal';
import { addReward } from '@/lib/api';
import { convertToISODateTime } from '@/helpers/reward';
import { AddRewardForm } from './AddRewardForm';
import { useRouter } from 'next/navigation';

interface AddRewardModalProps {
  projectId: string;
  setIsOpen: (open: boolean) => void;
  setAlertDialog: ({
    message,
    isOpen,
  }: {
    message: string;
    isOpen: boolean;
  }) => void;
}

export const AddRewardModal = ({
  projectId,
  setIsOpen,
  setAlertDialog,
}: AddRewardModalProps) => {
  const [saving, setSaving] = useState(false);
  const { refresh } = useRouter();

  const reset = useCallback(() => {
    setIsOpen(false);
    setSaving(false);
    refresh();
  }, [refresh]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    const { name, description, dueDate } = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    try {
      await addReward(
        String(name),
        String(description),
        convertToISODateTime(dueDate),
        projectId
      );
    } catch (err) {
      const message =
        err instanceof Error ? `${err.message}` : 'Could not perform action';
      setAlertDialog({ isOpen: true, message });
    } finally {
      reset();
    }
  };

  return (
    <Modal description="add reward">
      <h1 className="mb-6 text-3xl">Add Reward</h1>
      <AddRewardForm saving={saving} handleSubmit={handleSubmit} />
    </Modal>
  );
};
