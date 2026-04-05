import { buildSiteSchema } from "../../lib/schema";

export default function StructuredData() {
  const schema = buildSiteSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
