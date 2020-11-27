import { getUUID, getSpacecraftUuids } from '../../utils/uuid';
import { getMockSpacecraft } from '../../../../mocks/models';

test('getUuid from string, not pathname', () => {
  const results = getUUID('b6a4d0ce-c4e9-4da9-b9d8-42455fd09b45');
  expect(results).toBe('b6a4d0ce-c4e9-4da9-b9d8-42455fd09b45');
});

test('getUuid from pathname', () => {
  const results = getUUID('/class/b6a4d0ce-c4e9-4da9-b9d8-42455fd09b45');
  expect(results).toBe('b6a4d0ce-c4e9-4da9-b9d8-42455fd09b45');
});

test('getUuid returns null', () => {
  const results = getUUID(null);
  expect(results).toBe(null);
});

test('getSpacecraftUuids removes path information', () => {
  const mockSpacecraft = getMockSpacecraft();
  const results = getSpacecraftUuids(mockSpacecraft);
  expect(results.class).toBe('b6a4d0ce-c4e9-4da9-b9d8-42455fd09b45');
});
