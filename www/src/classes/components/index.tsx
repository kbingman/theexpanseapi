import { useRecoilValue } from 'recoil';
import { spacecraftClassState } from '../atoms';

type Props = {
  uuid: string;
};

export const SpacecraftClassInfo = ({ uuid }: Props) => {
  const spacecraftClass = useRecoilValue(spacecraftClassState(uuid));
  if (!spacecraftClass) {
    return null;
  }
  const { name } = spacecraftClass;

  return <h3>{name}</h3>;
};
