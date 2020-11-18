import { FormEvent, useState } from 'react';
import { updateSpacecraft } from '../utils';

/**
 * Spacecraft Class and Crew
 *
 * @returns JSX.Element
 */
export const SpacecraftForm = ({ name, uuid, setSpacecraft }) => {
  const [data, setData] = useState({ name });
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSpacecraft(await updateSpacecraft(uuid, data));
  };

  return (
    <div className="spacecraft-form">
      <form onSubmit={submit}>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ name: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
