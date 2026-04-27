// Budget Pet Care — CJ Advertiser ID 4250177
// 10% commission. Specialization: discount parasiticides (Frontline,
// K9 Advantix, Heartgard, Nexgard, Bravecto, Revolution) plus general
// pet supplies. Complementary positioning to Revival (vet-grade) — BPC
// covers value-pricing angle on brand-name parasite products.

import type { AffiliatePartner } from "./revival";

export type BudgetPetCareLinkKey =
  | "evergreen"
  | "discount10Off"
  | "extraSavings7"
  | "fleaTickGeneral"
  | "frontline"
  | "k9Advantix"
  | "bravecto"
  | "nexgard"
  | "heartgardPlus"
  | "revolution"
  | "capstar"
  | "dogSupplies";

interface BudgetPetCareConfig extends AffiliatePartner {
  links: Record<BudgetPetCareLinkKey, string>;
}

export const BUDGET_PET_CARE: BudgetPetCareConfig = {
  id: "budgetpetcare",
  name: "Budget Pet Care",
  shortDescription: "Brand-name parasiticides at discount prices.",
  longDescription:
    "Budget Pet Care offers brand-name flea, tick, and heartworm preventatives — Frontline, K9 Advantix, Heartgard, Bravecto, Nexgard, Revolution — at significant discounts versus clinic and pet-store pricing. Free shipping on most orders.",
  logo: "/images/affiliates/budgetpetcare-logo.jpg",

  links: {
    fleaTickGeneral: "https://www.kqzyfj.com/click-101726471-12972149",
    frontline: "https://www.anrdoezrs.net/click-101726471-12843744",
    k9Advantix: "https://www.anrdoezrs.net/click-101726471-12626683",
    bravecto: "https://www.kqzyfj.com/click-101726471-12972153",
    nexgard: "https://www.kqzyfj.com/click-101726471-12972163",
    heartgardPlus: "https://www.anrdoezrs.net/click-101726471-12972160",
    revolution: "https://www.kqzyfj.com/click-101726471-12972166",
    capstar: "https://www.tkqlhce.com/click-101726471-12628148",
    evergreen: "https://www.anrdoezrs.net/click-101726471-11744766",
    discount10Off: "https://www.tkqlhce.com/click-101726471-11761410",
    extraSavings7: "https://www.jdoqocy.com/click-101726471-13111268",
    dogSupplies: "https://www.anrdoezrs.net/click-101726471-11744766",
  },
};
