import { useRecoilValue } from "recoil";
import { spacecraftDetailSelector } from "../atoms/spacecraft";

/**
 * Spacecraft Class and Crew
 *
 * @returns JSX.Element
 */
export const SpacecraftDetail = ({ uuid }) => {
  const { spacecraft, error } = useRecoilValue(spacecraftDetailSelector(uuid));
  if (error) {
    return null;
  }

  return (
    <div className="spacecraft">
      <h4>{spacecraft.class?.name}</h4>
    </div>
  );
};
