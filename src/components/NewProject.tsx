'use client';
import { createNewProject } from '@/lib/api';
import { FormEvent, useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Modal, useModal } from './Modal';
import { useRouter } from 'next/navigation';

const NewProject = () => {
  const { isOpen, setIsOpen } = useModal();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const { refresh } = useRouter();

  const reset = () => {
    setIsOpen(false);
    setSaving(false);
    setName('');
    refresh();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    await createNewProject(name);
    reset();
  };

  return (
    <div className="flex items-center justify-center px-6 py-8 transition-all duration-200 ease-in-out hover:scale-105">
      <Button onClick={() => setIsOpen(true)}>+ New Project</Button>
      {isOpen && (
        <Modal>
          <h1 className="mb-6 text-3xl">New Project</h1>
          <form onSubmit={handleSubmit}>
            <fieldset
              disabled={saving}
              className="flex items-center justify-between gap-2"
            >
              <Input
                placeholder="project name"
                name="Project Name"
                required={true}
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <Button type="submit">Create</Button>
            </fieldset>
          </form>
        </Modal>
      )}{' '}
    </div>
  );
};

export default NewProject;
