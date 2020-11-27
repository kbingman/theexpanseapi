import { useRecoilValue } from 'recoil';
import { spacecraftClassDetailState } from '../atoms';

type Props = {
  uuid: string;
};

export const SpacecraftClassInfo = ({ uuid }: Props) => {
  const spacecraftClass = useRecoilValue(spacecraftClassDetailState(uuid));
  if (!spacecraftClass) {
    return null;
  }
  const { name } = spacecraftClass;

  return <h3>{name}</h3>;
};
