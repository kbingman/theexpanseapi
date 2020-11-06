import { fetchJSON } from "../../utils";
import { Spacecraft } from "../types";

export const getSpacecraft = (): Promise<Spacecraft[]> =>
  fetchJSON(`/spacecraft`, {
    method: "GET",
  });

export const getSpacecraftDetail = (uuid: string): Promise<Spacecraft> =>
  fetchJSON<Spacecraft>(`/spacecraft/${uuid}`, {
    method: "GET",
  });

export const createSpacecraft = (data: Spacecraft): Promise<Spacecraft> =>
  fetchJSON<Spacecraft>(`/spacecraft`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateSpacecraft = (
  uuid: string,
  data: Partial<Spacecraft>
): Promise<Spacecraft> =>
  fetchJSON<Spacecraft>(`/spacecraft/${uuid}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteSpacecraft = (uuid: string): Promise<{ uuid: string }> =>
  fetchJSON<Spacecraft>(`/spacecraft/${uuid}`, {
    method: "DELETE",
  });
