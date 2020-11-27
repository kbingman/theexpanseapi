import { fetchJSON } from '../../shared';
import { Spacecraft, SpacecraftDetail } from '../types';

/**
 * Feych all Spacecraft
 */
export const getSpacecraft = (): Promise<Spacecraft[]> =>
  fetchJSON(`/spacecraft`, {
    method: 'GET',
  });

/**
 * Fetch Spacecraft
 */
export const getSpacecraftDetail = (uuid: string): Promise<SpacecraftDetail> =>
  fetchJSON<SpacecraftDetail>(`/spacecraft/${uuid}`, {
    method: 'GET',
  });

/**
 * Create Spacecraft
 */
export const createSpacecraft = (data: Spacecraft): Promise<Spacecraft> =>
  fetchJSON<Spacecraft>(`/spacecraft`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

/**
 * Update Spacecraft
 */
export const updateSpacecraft = (
  uuid: string,
  data: Partial<Spacecraft>
): Promise<Spacecraft> =>
  fetchJSON<Spacecraft>(`/spacecraft/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

/**
 * Remove Spacecraft
 */
export const deleteSpacecraft = (uuid: string): Promise<{ uuid: string }> =>
  fetchJSON<Spacecraft>(`/spacecraft/${uuid}`, {
    method: 'DELETE',
  });
