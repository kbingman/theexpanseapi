import { Input, Field, Fieldset, Form } from '../../shared';

export interface SpacecraftFormProps {
  name: string;
  // owner: string;
  updateKey: (e: React.FormEvent<HTMLInputElement>) => void;
  updateModel: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * @param name
 * @param owner
 * @param updateKey
 * @param updateModel
 *
 * @returns JSX.Element
 */
export const SpacecraftForm = ({
  name,
  // owner,
  updateKey,
  updateModel,
}: SpacecraftFormProps) => (
  <Form onSubmit={updateModel}>
    <Fieldset>
      <Field>
        Name
        <Input
          textSize="text-2xl"
          autoFocus
          name="name"
          value={name}
          onChange={updateKey}
        />
      </Field>
      {/*<Field>
        Owner
        <Input
          textSize="text-base"
          name="owner"
          value={owner}
          onChange={updateKey}
        />
                </Field> */}
    </Fieldset>
    <button type="submit">Save</button>
  </Form>
);
