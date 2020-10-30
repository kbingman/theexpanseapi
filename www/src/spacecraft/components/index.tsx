import { FormEvent, Suspense, useState } from "react";
import { useRecoilValue } from "recoil";
// import { SpacecraftClass } from "../../classes";
// import { CrewDetail } from "../../people";
import { spacecraftDetailSelector } from "../atoms/spacecraft";

import {
  useActiveSpacecraft,
  useSpacecraft,
  useSpacecraftUuids,
} from "../hooks";
import { updateSpacecraft } from "../utils";

/**
 * Spacecraft Class and Crew
 *
 * @returns JSX.Element
 */
export const SpacecraftDetail = ({ uuid }) => {
  const spacecraft = useRecoilValue(spacecraftDetailSelector(uuid));
  console.log(spacecraft);
  if (!spacecraft) {
    return null;
  }
  return (
    <Suspense fallback={<div>Loading</div>}>
    <div className="spacecraft">
      <h2>TEST</h2>
    </div>
    </Suspense>
  );
};

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

/**
 * Displays a single Spacecraft
 * @oaram {Props}
 *
 * @returns JSX.Element
 */
export const SpacecraftListing = ({ uuid }: { uuid: string }) => {
  const { spacecraft } = useSpacecraft(uuid);
  if (!spacecraft) {
    return null;
  }
  const { name } = spacecraft;
  const { isVisible, setIsVisible } = useActiveSpacecraft(uuid);

  return (
    <div>
      <h4>
        {name}
        <button onClick={() => setIsVisible(uuid)}>Show Details</button>
      </h4>
      {isVisible && <SpacecraftDetail {...{ uuid }} />}
      {/* isVisible && <SpacecraftForm {...{ name, uuid, setSpacecraft }} /> */}
    </div>
  );
};

/**
 * Recoil data wrapper
 *
 * @returns JSX.Element
 */
export const SpacecraftList = () => {
  const uuids = useSpacecraftUuids();

  return (
    <div>
      {uuids.map((uuid) => (
        <SpacecraftListing key={`spacecraft-${uuid}`} uuid={uuid} />
      ))}
    </div>
  );
};
