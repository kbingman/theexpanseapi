import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { getModifiedNodes } from '../util/nodes';

/**
 * Logs modified nodes
 */
export const DebugObserver = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const nodes = getModifiedNodes(snapshot);
    console.log(nodes);
  });
  return null;
};
