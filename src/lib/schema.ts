import {
  BRAND_NAME,
  OWNER_HANDLE,
  OWNER_NAME,
  OWNER_LINKS,
  SITE_DESCRIPTION,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_URL,
} from "./site";
import { FAQ_ITEMS } from "./content";

type SchemaGraph = {
  "@context": "https://schema.org";
  "@graph": Array<Record<string, unknown>>;
};

export const buildSiteSchema = (): SchemaGraph => {
  const organizationId = `${SITE_URL}#organization`;
  const ownerId = `${SITE_URL}#owner`;
  const websiteId = `${SITE_URL}#website`;
  const webpageId = `${SITE_URL}#webpage`;
  const faqId = `${SITE_URL}#faq`;

  const faqEntities = FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BRAND_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: SITE_LOGO_URL,
        },
        image: SITE_LOGO_URL,
      },
      {
        "@type": "Person",
        "@id": ownerId,
        name: OWNER_NAME,
        alternateName: OWNER_HANDLE,
        url: SITE_URL,
        sameAs: [
          OWNER_LINKS.github,
          OWNER_LINKS.linkedin,
          OWNER_LINKS.instagram,
          OWNER_LINKS.website,
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { "@id": organizationId },
        creator: { "@id": ownerId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": websiteId },
        about: [{ "@id": organizationId }, { "@id": ownerId }],
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        name: `${SITE_NAME} FAQ`,
        url: SITE_URL,
        isPartOf: { "@id": websiteId },
        about: [{ "@id": organizationId }, { "@id": ownerId }],
        mainEntity: faqEntities,
      },
    ],
  };
};
