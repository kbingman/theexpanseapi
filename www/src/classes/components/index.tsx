import { useRecoilValue } from "recoil";
import { spacecraftClassDetailState } from "../atoms";

type Props = {
  url: string;
};

export const SpacecraftClass = ({ url }: Props) => {
  const spacecraftClass = useRecoilValue(spacecraftClassDetailState(url));
  if (!spacecraftClass) {
    return null;
  }
  const { name } = spacecraftClass;

  return <div>{name}</div>;
};
