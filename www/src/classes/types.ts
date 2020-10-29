export type SpacecraftClass = {
  uuid: string;
  name: string;
  ownerNavy: string[];
  propulsion: string[];
  armament: string[];
  complement: string[];
  crew: string[];
  length: string | null;
  width: string | null;
  weight: string;
};
