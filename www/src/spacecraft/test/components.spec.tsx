import { render } from "@testing-library/react";
import { RecoilRoot, MutableSnapshot } from "recoil";

import { getMockSpacecraft } from "../../../mocks/models";
import { SpacecraftList } from "../components/listing";
import { spacecraftState, spacecraftIdsState } from "../atoms/spacecraft";

const rocinante = getMockSpacecraft();
const initializeState = ({ set }: MutableSnapshot) => {
  set(spacecraftIdsState, [rocinante.uuid]),
    set(spacecraftState, {
      [rocinante.uuid]: rocinante,
    });
};

test("Spacecraft", () => {
  const { getByText } = render(
    <RecoilRoot {...{ initializeState }}>
      <SpacecraftList />
    </RecoilRoot>
  );

  const title = getByText("Rocinante");
  const button = getByText("Show Details");

  expect(title.tagName).toBe("H3");
  expect(button.tagName).toBe("BUTTON");
});
