import { render } from "@testing-library/react";
import { RecoilRoot, MutableSnapshot } from "recoil";

import { getMockSpacecraft } from "../../../test/mocks";

import { SpacecraftList } from "../components";
import { spacecraftState, spacecraftIdsState } from "../atoms/spacecraft";

const rocinante = getMockSpacecraft();
const initializeState = (snap: MutableSnapshot) => {
  snap.set(spacecraftIdsState, [rocinante.uuid]),
    snap.set(spacecraftState, {
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

  expect(title.tagName).toBe("H4");
  expect(button.tagName).toBe("BUTTON");
});
