import { act, renderRecoilHook } from "react-recoil-hooks-testing-library";
import { activeSpacecraftState } from "../atoms/ui";
import { useActiveSpacecraft } from "../hooks";

test("should check if current uuid is selected", () => {
  const { result } = renderRecoilHook(() => useActiveSpacecraft("uuid"), {
    states: [{ recoilState: activeSpacecraftState, initialValue: "uuid" }],
  });

  expect(result.current.isVisible).toBe(true);
  act(() => {
    result.current.setIsVisible("uuid");
  });
  expect(result.current.isVisible).toBe(false);
});
