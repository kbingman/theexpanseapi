import { useRecoilValue } from "recoil";
import { crewDetailState } from "../atoms";

export const CrewDetail = ({ uuid }) => {
  const crew = useRecoilValue(crewDetailState(uuid));
  if (!crew) {
    return null;
  }

  return <div className="crew-detail">{crew.name}</div>;
};
