import { FormEvent, useState } from 'react';
import { SpacecraftClassInfo } from '../../classes';
import { CrewDetail } from '../../people';
import { useSpacecraftDetail } from '../hooks';
import { Spacecraft } from '../types';
import { updateSpacecraft } from '../utils';

export const SpacecraftDisplay = ({ uuid }) => {
  const [spacecraft, setSpacecraft] = useSpacecraftDetail(uuid);
  if (!spacecraft) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <SpacecraftForm {...{ spacecraft, setSpacecraft }} />
      <SpacecraftClassInfo uuid={spacecraft.class} />
      {spacecraft.crew.map((uuid) => (
        <CrewDetail key={`crew-${uuid}`} uuid={uuid} />
      ))}
    </>
  );
};

/**
 * Spacecraft Class and Crew
 *
 * @returns JSX.Element
 */
export const SpacecraftForm = ({ spacecraft, setSpacecraft }) => {
  const [spacecraftData, setSpacecraftData] = useState<Partial<Spacecraft>>(
    spacecraft
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSpacecraft(await updateSpacecraft(spacecraft.uuid, {
      ...spacecraft,
      ...spacecraftData,
    }));
  };

  return (
    <div className="spacecraft-form">
      <form onSubmit={submit}>
        <label htmlFor={`name-${spacecraft.uuid}`}>Name</label>
        <input
          type="text"
          id={`name-${spacecraft.uuid}`}
          value={spacecraftData.name}
          onChange={(e) => setSpacecraftData({ name: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
