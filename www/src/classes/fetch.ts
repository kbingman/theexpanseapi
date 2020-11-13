import { fetchJSON } from "../shared";

export const getSpacecraftClasses = () => fetchJSON("/classes");
