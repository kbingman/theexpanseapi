import { FormEvent, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SpacecraftClassInfo } from '../../classes';
import { CrewDetail } from '../../people';
import { putAndSetSpacecraft } from '../api';
import { spacecraftListingSelector } from '../atoms/selectors';
import { useSpacecraftDetail } from '../hooks';
import { Spacecraft } from '../types';

export const LoadSpacecraftDetail = ({ uuid }) => {
  useSpacecraftDetail(uuid);
  return null;
};

export const SpacecraftDisplay = ({ uuid }) => {
  const spacecraft = useRecoilValue(spacecraftListingSelector(uuid));
  if (!spacecraft) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LoadSpacecraftDetail {...{ uuid }} />
      <SpacecraftForm {...{ spacecraft }} />
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
export const SpacecraftForm = ({ spacecraft }) => {
  const setSpacecraft = useSetRecoilState(
    spacecraftListingSelector(spacecraft.uuid)
  );
  const [spacecraftData, setSpacecraftData] = useState<Partial<Spacecraft>>(
    spacecraft
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    putAndSetSpacecraft(setSpacecraft, {
      ...spacecraft,
      ...spacecraftData,
    });
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
