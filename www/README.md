Testing recoil

```
  render(
    <RecoilRoot initializeState={(snap) => snap.set(myAtom, {foo: 'bar'})}>
      <MyComponent />
    </RecoilRoot>,
  );
```
