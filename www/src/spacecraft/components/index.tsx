import { FormEvent, useState } from "react";
import { SpacecraftClass } from "../../classes";
import { CrewDetail } from "../../people";

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
export const SpacecraftDetail = ({ crew, classURL }) => (
  <div className="spacecraft">
    <SpacecraftClass url={classURL} />
    {crew.map((url: string) => (
      <CrewDetail key={url} url={url} />
    ))}
  </div>
);

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
  const { spacecraft, setSpacecraft } = useSpacecraft(uuid);
  if (!spacecraft) {
    return null;
  }
  const { crew, name, class: classURL } = spacecraft;
  const { isVisible, setIsVisible } = useActiveSpacecraft(uuid);

  return (
    <div>
      <h4>
        {name}
        <button onClick={() => setIsVisible(uuid)}>Show Details</button>
      </h4>
      {/* isVisible && <SpacecraftDetail {...{ crew, classURL }} /> */}
      {isVisible && <SpacecraftForm {...{ name, uuid, setSpacecraft }} />}
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
