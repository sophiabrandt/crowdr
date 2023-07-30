import { FormEvent } from 'react';
import { Button } from './Button';
import { Input } from './Input';

interface AddRewardFormProps {
  saving: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const AddRewardForm = ({ saving, handleSubmit }: AddRewardFormProps) => (
  <form onSubmit={handleSubmit}>
    <fieldset disabled={saving} className="grid gap-2 grid-auto-fit">
      <Input
        placeholder="reward name"
        name="name"
        required={true}
        defaultValue=""
      />
      <Input
        placeholder="reward description"
        name="description"
        required={true}
        defaultValue=""
      />
      <Input
        placeholder="reward due date"
        name="dueDate"
        type="date"
        required={true}
        defaultValue=""
      />
      <Button type="submit">Add</Button>
    </fieldset>
  </form>
);
