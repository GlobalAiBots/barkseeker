// Revival Animal Health — CJ Advertiser ID 4579683
// Approved partner config. URLs are real CJ click-tracking links;
// do not modify without re-pulling from CJ dashboard.
// Lifted from babymydog. Same partner config across both sites.

export type AffiliateLinkKey =
  | "jointCare"
  | "autoShip"
  | "freeShipping"
  | "evergreen"
  | "logoBanner"
  | "breederBundles"
  | "catDental"
  | "grooming"
  | "discount10Off"
  | "vitaminsGeneral"
  | "puppyNeeds"
  | "fleaTickDog"
  | "dentalDog"
  | "supplementsDog"
  | "vaccinesDog";

export type AffiliateBannerKey = "logo250" | "evergreen970" | "evergreen728" | "evergreen300";

export interface AffiliatePartner {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  logo?: string;
  links: Record<AffiliateLinkKey, string>;
  banners: Record<AffiliateBannerKey, { url: string; w: number; h: number; click: string }>;
}

export const REVIVAL: AffiliatePartner = {
  id: "revival",
  name: "Revival Animal Health",
  shortDescription: "Vet-grade pet supplies since 1987.",
  longDescription:
    "Revival Animal Health has supplied breeders, shelters, and pet owners with vet-grade vitamins, supplements, and care products for nearly 40 years. Free shipping on orders $149+.",
  logo: "/images/affiliates/revival-logo.png",

  links: {
    jointCare: "https://www.jdoqocy.com/click-101726471-15167292",
    autoShip: "https://www.jdoqocy.com/click-101726471-15631209",
    freeShipping: "https://www.kqzyfj.com/click-101726471-15167246",
    evergreen: "https://www.kqzyfj.com/click-101726471-15736120",
    logoBanner: "https://www.jdoqocy.com/click-101726471-12305267",
    breederBundles: "https://www.anrdoezrs.net/click-101726471-15796273",
    catDental: "https://www.jdoqocy.com/click-101726471-15167299",
    grooming: "https://www.kqzyfj.com/click-101726471-15167304",
    discount10Off: "https://www.anrdoezrs.net/click-101726471-15167249",
    vitaminsGeneral: "https://www.kqzyfj.com/click-101726471-15167230",
    puppyNeeds: "https://www.jdoqocy.com/click-101726471-15167255",
    fleaTickDog: "https://www.tkqlhce.com/click-101726471-15167300",
    dentalDog: "https://www.anrdoezrs.net/click-101726471-15167298",
    supplementsDog: "https://www.jdoqocy.com/click-101726471-15167250",
    vaccinesDog: "https://www.kqzyfj.com/click-101726471-15167252",
  },

  banners: {
    logo250: {
      url: "https://www.awltovhc.com/image-101726471-15860843",
      w: 250,
      h: 250,
      click: "https://www.jdoqocy.com/click-101726471-15860843",
    },
    evergreen970: {
      url: "https://www.awltovhc.com/image-101726471-17252042",
      w: 970,
      h: 250,
      click: "https://www.kqzyfj.com/click-101726471-17252042",
    },
    evergreen728: {
      url: "https://www.lduhtrp.net/image-101726471-17252041",
      w: 728,
      h: 90,
      click: "https://www.jdoqocy.com/click-101726471-17252041",
    },
    evergreen300: {
      url: "https://www.lduhtrp.net/image-101726471-17252038",
      w: 300,
      h: 250,
      click: "https://www.tkqlhce.com/click-101726471-17252038",
    },
  },
};
