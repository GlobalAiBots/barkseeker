export interface Vet {
  id: string; slug: string; name: string; latitude: number; longitude: number;
  state: string; stateAbbr: string; city: string; address: string;
  phone: string; website: string; rating: number; reviewCount: number; source: string;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const raw: Vet[] = require("./vets.json");

export const allVets: Vet[] = raw;

export function getVetBySlug(slug: string): Vet | undefined {
  return allVets.find((v) => v.slug === slug);
}

export function getVetsByState(abbr: string): Vet[] {
  return allVets.filter((v) => v.stateAbbr === abbr);
}

export function getVetsByCity(city: string, stateAbbr: string): Vet[] {
  return allVets.filter((v) => v.city.toLowerCase() === city.toLowerCase() && v.stateAbbr === stateAbbr);
}

export { stateNames, stateSlugs, slugToAbbr, slugify } from "./all-groomers";
