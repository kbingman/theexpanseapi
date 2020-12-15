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

export interface SpacecraftFormProps {
  className: string;
  crew: Person[];
  name: string;
  owner: string[];
  toggleModal: (e: React.MouseEvent) => void;
  updateModel: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * @param className
 * @param crew
 * @param name
 * @param owner
 * @param toggleModal
 * @param updateKey
 * @param updateModel
 *
 * @returns JSX.Element
 */
export const SpacecraftForm = ({
  className,
  crew,
  name,
  owner,
  toggleModal,
  updateKey,
  updateModel,
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
              name="name"
              value={name}
              onChange={updateKey}
            />
          </Field>
          <Field>
            Owner
            <Input
              textSize="text-base"
              name="owner"
              value={owner}
              onChange={updateKey}
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
