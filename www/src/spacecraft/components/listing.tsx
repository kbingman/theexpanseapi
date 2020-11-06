import { Suspense } from "react";
import {
  useActiveSpacecraft,
  useSpacecraft,
  useSpacecraftUuids,
} from "../hooks";
import { SpacecraftDetail } from "./detail";

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
  const label = isVisible ? "Hide" : "Show";
  return (
    <div>
      <h3>
        {name}
        <button onClick={() => setIsVisible(uuid)}>{label} Details</button>
      </h3>
      {isVisible && (
        <Suspense fallback={<div>Loading</div>}>
          <SpacecraftDetail {...{ uuid }} />
        </Suspense>
      )}
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
      <h2>Spacecraft</h2>
      {uuids.map((uuid) => (
        <SpacecraftListing key={`spacecraft-${uuid}`} uuid={uuid} />
      ))}
    </div>
  );
};
