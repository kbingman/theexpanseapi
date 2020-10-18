import { useRecoilValue } from 'recoil';
import { spacecraftClassDetailState } from '../atoms';

export const SpacecraftClass = ({ url }) => {
  const spacecraftClass = useRecoilValue(spacecraftClassDetailState(url));
  if (!spacecraftClass) {
    return null;
  }
  const { name } = spacecraftClass;

  return <div>{name}</div>
} 
