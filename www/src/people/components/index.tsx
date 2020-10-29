import { useRecoilValue } from "recoil";
import { crewDetailState } from "../atoms";

export const CrewDetail = ({ url }) => {
  const crew = useRecoilValue(crewDetailState(url));
  if (!crew) {
    return null;
  }

  return <div className="crew-detail">{crew.name}</div>;
};
