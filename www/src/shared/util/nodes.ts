import { RecoilValue, Snapshot } from "recoil";
import { reduce } from "../fp";

type NodeData = {
  key: string;
  data: any;
};

// Move to a transducer?
const getNodeReducer = (snapshot: Snapshot) => (
  acc: NodeData[],
  node: RecoilValue<any>
): NodeData[] => {
  const info = snapshot.getInfo_UNSTABLE(node);
  if (info.isModified) {
    acc.push({ key: node.key, data: info.loadable.getValue() });
  }
  return acc;
};

export const getModifiedNodes = (snapshot: Snapshot): NodeData[] =>
  reduce(getNodeReducer(snapshot), [], snapshot.getNodes_UNSTABLE());
