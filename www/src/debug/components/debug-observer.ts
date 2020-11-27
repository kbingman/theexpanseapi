import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

import { spacecraftClassState } from '../../classes';
import { episodesState } from '../../episodes';
import { crewState } from '../../people';
import { spacecraftState } from '../../spacecraft';
import { logger } from '../../shared/';

import { getModifiedNodes } from '../util/nodes';

// interface DebugWindow extends Window {
//   debugInfo?: { [name: string]: any }
// };

/**
 * Logs modified nodes
 */
export const DebugObserver = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const nodes = getModifiedNodes(snapshot);
    const debug = {
      spacecraft: snapshot.getLoadable(spacecraftState).contents,
      classes: snapshot.getLoadable(spacecraftClassState).contents,
      episodes: snapshot.getLoadable(episodesState).contents,
      people: snapshot.getLoadable(crewState).contents,
    };
    if (process.env.NODE_ENV === 'development') {
      (window as any).debugInfo = debug;
      nodes.forEach(n => logger(n.key)) 
    }
  });
  return null;
};
