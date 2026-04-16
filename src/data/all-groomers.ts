export interface Groomer {
  id: string; slug: string; name: string; latitude: number; longitude: number;
  state: string; stateAbbr: string; city: string; address: string;
  phone: string; website: string; rating: number; reviewCount: number; source: string;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const raw: Groomer[] = require("./groomers.json");

export const allGroomers: Groomer[] = raw;

export function getGroomerBySlug(slug: string): Groomer | undefined {
  return allGroomers.find((g) => g.slug === slug);
}

export function getGroomersByState(abbr: string): Groomer[] {
  return allGroomers.filter((g) => g.stateAbbr === abbr);
}

export function getGroomersByCity(city: string, stateAbbr: string): Groomer[] {
  return allGroomers.filter((g) => g.city.toLowerCase() === city.toLowerCase() && g.stateAbbr === stateAbbr);
}

export const stateNames: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};

export const stateSlugs: Record<string, string> = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",DC:"washington-dc",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};

export const slugToAbbr: Record<string, string> = Object.fromEntries(Object.entries(stateSlugs).map(([a, s]) => [s, a]));

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
