// Sitewide counts derived from the current data files at build time.
// Import and use SITE_STATS.total.toLocaleString() instead of hardcoding "37,000+"
// anywhere — including inside `export const metadata` blocks, which run at module
// load and can safely read these values.

import { unified } from "@/data/all-parks";
import { allGroomers } from "@/data/all-groomers";
import { allVets } from "@/data/all-vets";

export const SITE_STATS = {
  parks: unified.length,
  groomers: allGroomers.length,
  vets: allVets.length,
  total: unified.length + allGroomers.length + allVets.length,
} as const;
