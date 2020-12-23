import { useRecoilValue } from 'recoil';
import { spacecraftClassDetailState } from '../../classes';
import { Label, TextButton } from '../../shared';

/**
 *
 */
export const SpacecraftClassDisplay = ({ name }) => (
  <div className="mb-2">
    <Label>Class</Label>
    <div className="mb-1 font-sans text-base font-normal">
      {name ? (
        <>
          {name}
          <TextButton onClick={(e) => console.log(e)}>Edit</TextButton>
          {'|'}
          <TextButton onClick={(e) => console.log(e)}>Remove</TextButton>
        </>
      ) : (
        <div className="relative -left-2">
          <TextButton onClick={(e) => console.log(e)}>Add</TextButton>
        </div>
      )}
    </div>
  </div>
);

export const ClassData = ({ uuid }) => {
  const spacecraftClass = useRecoilValue(spacecraftClassDetailState(uuid));
  const name = spacecraftClass?.name; 

  return <SpacecraftClassDisplay {...{ name }} />;
};
