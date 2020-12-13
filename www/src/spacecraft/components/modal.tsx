import { Person } from '../../people';
import {
  CloseButton,
  TextButton,
  Input,
  Field,
  Fieldset,
  Label,
  Form,
  Modal,
  Overlay,
} from '../../shared';

// export interface SpacecraftFormProps {
//   className: string;
//   crew: Person[];
//   name: string;
//   owner: string[];
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   toggleModal: (e: React.MouseEvent) => void;
// }

const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  console.log(e.target.value);

/**
 * @param className
 * @param crew
 * @param name
 * @param owner
 * @param toggleModal
 * @param updateName
 * @param onSubmit
 *
 * @returns JSX.Element
 */
export const SpacecraftForm = ({
  className,
  crew,
  name,
  owner,
  updateModel,
  toggleModal,
  updateName,
}) => (
  <Overlay>
    <CloseButton onClick={toggleModal} />
    <Modal>
      <Form onSubmit={updateModel}>
        <Fieldset>
          <Field>
            Name
            <Input
              textSize="text-2xl"
              defaultValue={name}
              onChange={updateName}
            />
          </Field>
          <Field>
            Owner
            <Input
              textSize="text-base"
              key={`owner-${name}`}
              onChange={onChange}
              defaultValue={(owner || []).join(', ')}
            />
          </Field>
        </Fieldset>

        <button type="submit">Save</button>
      </Form>
      <div className="mb-2">
        <Label>Class</Label>
        <div className="mb-1 font-sans text-base font-normal">
          {className ? (
            <>
              {className}
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
      <div className="mb-2">
        <Label>Crew</Label>
        {(crew || []).map(({ name, uuid }) => (
          <div key={`crew-${uuid}`} className="text-sm font-regular">
            {name}
            <TextButton onClick={(e) => console.log(e)}>Edit</TextButton>
            {'|'}
            <TextButton onClick={(e) => console.log(e)}>Remove</TextButton>
          </div>
        ))}
        <div className="relative -left-2">
          <TextButton onClick={(e) => console.log(e)}>Add</TextButton>
        </div>
      </div>
    </Modal>
  </Overlay>
);
