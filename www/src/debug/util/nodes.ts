import { RecoilValue, Snapshot } from 'recoil';
import { compose, filter, map, sequence } from '../../fp';

/**
 * A predicate to filter modified nodes
 * @param {snapshot}
 *
 * @returns Boolean
 */
const getNodeFilter = (snapshot: Snapshot) => (
  node: RecoilValue<any>
): boolean => snapshot.getInfo_UNSTABLE(node).isModified;

const getNodeLogger = (snapshot: Snapshot) => (node: RecoilValue<any>) => {
  const { loadable } = snapshot.getInfo_UNSTABLE(node);

  return {
    key: node.key,
    contents: loadable.contents
  };
};

/**
 * Takes a Snapshot and returns the modified nodes
 *
 * @param {snapshot}
 *
 * @return Nodes
 */
export const getModifiedNodes = (snapshot: Snapshot) =>
  sequence(
    compose(
      map(getNodeLogger(snapshot)), 
      filter(getNodeFilter(snapshot))
    ),
    snapshot.getNodes_UNSTABLE()
  );
