const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, "");

export const SITE_URL = "https://nextapi.sklconnect.com";
export const SITE_LOGO_PATH = "/logo/nextskl_stars.png";
export const SITE_NAME = "Next SKL Api";
export const SITE_TAGLINE = "Infrastructure-grade API platform for modern integrations.";
export const SITE_DESCRIPTION =
  "Next SKL Api delivers secure modules, stable contracts, and operational visibility for teams building production-grade integrations.";
export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;
export const BRAND_NAME = "SKL Connect";
export const OWNER_NAME = "Im_JVallejo";
export const OWNER_HANDLE = "im_jvallejo";
export const OWNER_LINKS = {
  github: "https://github.com/Yukyshiram",
  linkedin: "https://www.linkedin.com/in/im-jvallejo",
  instagram: "https://instagram.com/im_jvallejo",
  website: "https://imjvallejo.dev/",
} as const;
export const API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SKL_API_BASE_URL ?? SITE_URL
);