import { useRecoilValue } from 'recoil';
import { crewUUIDsState } from '../../people';
import { Label, TextButton } from '../../shared';

/**
 * @param name
 * @param uuid
 * @param onEdit
 * @param onRemove
 */
export const CrewDisplay = ({ name, uuid, onEdit, onRemove }) => (
  <div key={`crew-${uuid}`} className="text-sm font-regular">
    {name}
    <TextButton onClick={onEdit}>Edit</TextButton>
    {'|'}
    <TextButton onClick={onRemove}>Remove</TextButton>
  </div>
);

export const SpacecraftCrew = ({ crew, onAdd, onEdit, onRemove }) => (
  <div className="mb-2">
    <Label>Crew</Label>
    {crew.map(({ name, uuid }) => (
      <CrewDisplay key={uuid} {...{ name, uuid, onEdit, onRemove }} />
    ))}
    <div className="relative -left-2">
      <TextButton onClick={onAdd}>Add</TextButton>
    </div>
  </div>
);

export const CrewData = ({ uuids }: { uuids: string[] }) => {
  const crew = useRecoilValue(crewUUIDsState(uuids));
  const onAdd = (e: React.MouseEvent) => console.log(e);
  const onEdit = (e: React.MouseEvent) => console.log(e);
  const onRemove = (e: React.MouseEvent) => console.log(e);

  return <SpacecraftCrew {...{ crew, onAdd, onEdit, onRemove }} />;
};
